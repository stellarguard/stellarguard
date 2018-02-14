const { stellar, payments, accounts, users } = require('../lib');
const { StellarPayment, stellarPaymentsService } = payments;
const { accountsService } = accounts;
const { userService } = users;

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error(error);
});

(async () => {
  const publicKey = 'GDW3GGFLIFHOQD2TMKNSDHNCJQPD4CXHSJ7N5UOKHK4JFK3DUQVJ5LTZ';
  try {
    const lastPayment = await stellarPaymentsService.getLastRecordedPayment();
    let cursor;
    if (lastPayment) {
      cursor = lastPayment.cursor;
    }

    const paymentsProccessor = new PaymentsProccessor();
    stellar.accounts.watchForPayments(publicKey, {
      cursor,
      onPayment: async payment => {
        try {
          paymentsProccessor.addPayment(new StellarPayment(payment));
        } catch (e) {
          console.error(e);
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
})();

class PaymentsProccessor {
  constructor() {
    this.processing = false;
    this.paymentsToProccess = [];
  }

  addPayment(payment) {
    this.paymentsToProccess.push(payment);
    if (!this.processing) {
      this.process();
    }
  }

  async process() {
    this.processing = true;
    while (this.paymentsToProccess.length) {
      const payment = this.paymentsToProccess.shift();
      // TODO transaction or error handling
      await createAndActivateAccountForPayment(payment);
      await stellarPaymentsService.recordPayment(payment);
    }
    this.processing = false;
  }
}

async function createAndActivateAccountForPayment(payment) {
  const username = payment.memo;
  if (!username) {
    return;
  }

  const user = await userService.getUserByUsername(username);
  if (!user) {
    console.warn(
      `Transaction with memo ${username} was sent but no user exists with that username`
    );
    return;
  }

  let account = await accountsService.getAccountByUserId(user.id, {
    withPayments: true
  });

  if (!account) {
    account = await accountsService.createAccount({
      userId: user.id,
      publicKey: payment.from
    });
  }

  account.payments.push(payment);
  if (account.canBeActivated) {
    await accountsService.activateAccount(account);
  }
}
