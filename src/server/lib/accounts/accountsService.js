const StellarAccount = require('./StellarAccount');
const stellarAccountsRepository = require('./stellarAccountsRepository');
const stellar = require('../stellar');
const { NotAuthorizedError } = require('errors/common');

class AccountsService {
  async getAccounts({ cursor, limit = 20 } = {}) {
    return await stellarAccountsRepository.getAccounts({ cursor, limit });
  }

  async createAccount(account) {
    return await stellarAccountsRepository.createAccount(account);
  }

  async getAccount(id) {
    return await stellarAccountsRepository.getAccountById(id);
  }

  async getAccountByPublicKey(publicKey) {
    return await stellarAccountsRepository.getAccountByPublicKey(publicKey);
  }

  async getForUser(user) {
    return await stellarAccountsRepository.getAccountsByUserId(user.id);
  }

  async activateAccount(account) {
    return await this.createAccount(account);
  }

  async deactivateAccount(account) {
    return await stellarAccountsRepository.deactivateAccount(account);
  }

  async updateAccount({ account, user }) {
    if (account.userId !== user.id) {
      throw new NotAuthorizedError();
    }
    return await stellarAccountsRepository.updateAccount(account);
  }
}

module.exports = new AccountsService();
