const StellarPayment = require('../payments').StellarPayment;
const StellarAccount = require('./StellarAccount');
const Cursor = require('../utils').Cursor;

class StellarAccountsRepository {
  constructor() {
    this.stellarAccountsDb = require('./stellarAccountsDb');
    this.paymentsDb = require('../payments/paymentsDb');
    this.userDb = require('../users/userDb');
  }

  async getAccounts({ cursor, limit }) {
    const accounts = this.stellarAccountsDb
      .getAll()
      .filter(account => !cursor.hasValue() || account.id > cursor.getValue())
      .slice(0, limit)
      .map(account => new StellarAccount(account));

    return {
      cursor: Cursor.fromValue(accounts[accounts.length - 1]),
      accounts
    };
  }

  async createAccount(account) {
    const { userId, publicKey } = account;
    const id = this.stellarAccountsDb.create({ userId, publicKey });
    return new StellarAccount({ userId, publicKey, id });
  }

  async getAccountById(id) {
    return new StellarAccount(this.stellarAccountsDb.get(id));
  }

  async getAccountByUserId(userId, { withPayments = false }) {
    const data = this.stellarAccountsDb.get(userId, 'userId');
    if (!data) {
      return;
    }

    const account = new StellarAccount(data);
    if (withPayments) {
      account.payments = await this.getPayments(userId);
    }

    return account;
  }

  async findAccountsByPublicKey(publicKey) {
    const accountsData =
      this.stellarAccountsDb.get(publicKey, 'publicKey') || [];
    return accountsData.map(accountData => new StellarAccount(accountData));
  }

  async getPayments(userId) {
    const user = this.userDb.get(userId);
    return Object.values(this.paymentsDb.db.data.id)
      .map(paymentDto => new StellarPayment(paymentDto))
      .filter(payment => payment.memo === user.username);
  }

  async activateAccount(account) {
    account.isActive = true;
    const { id, userId, publicKey, isActive } = account;
    this.stellarAccountsDb.update({ id, userId, publicKey, isActive });
    return account;
  }

  async deactivateAccount(account) {
    account.isActive = false;
    const { id, userId, publicKey, isActive } = account;
    this.stellarAccountsDb.update({ id, userId, publicKey, isActive });
    return account;
  }
}

module.exports = new StellarAccountsRepository();
