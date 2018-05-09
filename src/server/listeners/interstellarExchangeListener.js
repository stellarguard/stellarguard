const { interstellarExchangeService } = require('../lib/interstellarExchange');
const { Transaction, transactionService } = require('../lib/transactions');
const { userService } = require('../lib/users');
const stellar = require('../lib/stellar');
const { DuplicateTransactionError } = require('errors/transaction');

class InterstellarExchangeListener {
  start() {
    this.stopListening = interstellarExchangeService.listenForTransactions(
      this._onTransaction.bind(this)
    );
  }

  stop() {
    this.stopListening && this.stopListening();
  }

  async _onTransaction(interstellarExchangeTransaction) {
    console.log('Got transaction from interstellar.exchange');
    // transactions not signed by source account are not ready to be submitted to StellarGuard
    if (!interstellarExchangeTransaction.isSignedBySourceAccount()) {
      return;
    }

    const xdr = stellar.transactions.toXdr(
      interstellarExchangeTransaction.toStellarTransaction()
    );

    const transaction = new Transaction({
      xdr,
      externalId: interstellarExchangeTransaction.id,
      submittedFrom: 'interstellar.exchange'
    });

    try {
      const user = await userService.getUserByAccountPublicKey(
        transaction.source
      );

      await transactionService.createTransaction(transaction, user);
    } catch (e) {
      if (!(e instanceof DuplicateTransactionError)) {
        console.error('Error submitting InterStellar.Exchange Transaction', e);
      }
    }
  }
}

module.exports = new InterstellarExchangeListener();
