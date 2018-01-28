const bcrypt = require('bcrypt');
const userRepository = require('./userRepository');
const User = require('./User');
const passwords = require('./passwords');

const accounts = require('../accounts');
const tfa = require('../tfa');

class UserService {
  async createUser({ username, email, password }) {
    // TODO: password validations
    const passwordHash = await passwords.hash(password);

    // TODO -- add email strategy as default
    return await userRepository.createUser({
      username,
      email,
      passwordHash
    });
  }

  async getUserById(
    id,
    { withTfaStrategies = false, withStellarAccounts = false } = {}
  ) {
    const user = await userRepository.getUserById(id);
    if (withTfaStrategies || withStellarAccounts) {
      if (withTfaStrategies) {
        user.tfaStrategies = await tfa.tfaStrategyService.getStrategiesForUserId(
          user.id
        );
      }

      if (withStellarAccounts) {
        // TODO -- allow multiple accounts to be returned
        user.stellarAccounts = await accounts.accountsService.getAccountByUserId(
          user.id
        );
      }
    }

    return user;
  }

  async getUserByUsername(username) {
    return await userRepository.getUserByUsername(username);
  }

  /**
   * Gets the user that has an active accounts with the given public key.
   *
   * @param {string} publicKey The public key of the account to search by.
   */
  async getByAccountPublicKey(
    publicKey,
    options = { withTfaStrategies: false }
  ) {
    const user = await userRepository.getByAccountPublicKey(publicKey);
    if (!user) {
      return;
    }

    if (withTfaStrategies) {
      user.tfaStrategies = await tfa.tfaStrategyService.getStrategiesForUserId(
        user.id
      );
    }

    return user;
  }
}

module.exports = new UserService();
