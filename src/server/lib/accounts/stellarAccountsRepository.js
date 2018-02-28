const StellarPayment = require('../payments').StellarPayment;
const StellarAccount = require('./StellarAccount');
const Cursor = require('../utils').Cursor;

class StellarAccountsRepository {
  constructor() {
    this.stellarAccountsDb = require('./stellarAccountsDb');
    this.paymentsDb = require('../payments/paymentsDb');
    this.userDb = require('../users/userDb');
  }

  async createAccount({ userId, publicKey }) {
    const newAccount = await this.stellarAccountsDb.create({
      userId,
      publicKey
    });
    return new StellarAccount(newAccount);
  }

  async getAccountById(id) {
    const account = await this.stellarAccountsDb.getById(id);
    if (account) {
      return new StellarAccount(account);
    }
  }

  async getAccountsByUserId(userId) {
    const accounts = await this.stellarAccountsDb.getByUserId(userId);
    return accounts.map(account => new StellarAccount(account));
  }

  async findAccountsByPublicKey(publicKey) {
    const accountsData =
      this.stellarAccountsDb.get(publicKey, 'publicKey') || [];
    return accountsData.map(accountData => new StellarAccount(accountData))[0];
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
