const StellarAccount = require('./StellarAccount');
const stellarAccountsRepository = require('./stellarAccountsRepository');
const stellar = require('../stellar');

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

  async getForUser(user) {
    return await stellarAccountsRepository.getAccountsByUserId(user.id);
  }

  async activateAccount(account) {
    return await this.createAccount(account);
  }

  async deactivateAccount(account) {
    return await stellarAccountsRepository.deactivateAccount(account);
  }
}

module.exports = new AccountsService();
