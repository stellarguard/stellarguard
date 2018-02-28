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

  async findAccountsByPublicKey(publicKey, options) {
    return await stellarAccountsRepository.findAccountsByPublicKey(publicKey);
  }

  async activateAccount(account) {
    return await stellarAccountsRepository.activateAccount(account);
  }

  async deactivateAccount(account) {
    return await stellarAccountsRepository.deactivateAccount(account);
  }

  async getMultiSigActivationTransaction(account, user, { backupSigner }) {
    const transaction = await stellar.multisig.buildMultiSigTransaction(
      account.publicKey,
      {
        memoText: user.memoText,
        backupSigner
      }
    );

    const xdr = stellar.transactions.toXdr(transaction);
    return {
      transaction,
      xdr
    };
  }
}

module.exports = new AccountsService();
