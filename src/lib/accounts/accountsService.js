const StellarAccount = require('./StellarAccount');
const stellarAccountsRepository = require('./stellarAccountsRepository');

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

  async getAccountByUserId(userId, options) {
    return await stellarAccountsRepository.getAccountByUserId(userId, options);
  }

  async findAccountsByPublicKey(publicKey, options) {
    return await stellarAccountsRepository.findAccountsByPublicKey(publicKey);
  }

  async activateAccount(account) {
    return await stellarAccountsRepository.activateAccount(account);
  }

  async deactivateAccount(account) {
    return await stellarAccountsRepository.deactivateAccount(account);
  }
}

module.exports = new AccountsService();
