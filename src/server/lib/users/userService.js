const userRepository = require('./userRepository');
const User = require('./User');
const passwords = require('./passwords');

const accounts = require('../accounts');
const tfa = require('../tfa');
const { emailService } = require('../email');
const userValidator = require('./userValidator');

class UserService {
  async createUser({ username, email, password }) {
    await userValidator.validate({ username, email, password });
    const passwordHash = await passwords.hash(password);
    const user = await userRepository.createUser({
      username,
      email,
      passwordHash
    });

    emailService.sendWelcomeEmail({ user });

    return user;
  }

  async getUserById(
    id,
    { withTfaStrategies = false, withStellarAccounts = false } = {}
  ) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      return;
    }

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

    return user;
  }

  async sendVerifyEmailAddressEmail(user) {
    await emailService.sendWelcomeEmail({ user });
  }

  async getUserByUsername(username) {
    return await userRepository.getUserByUsername(username);
  }

  async verifyEmail(user, code) {
    if (!user.verifyEmailCode(code)) {
      return false;
    }

    await Promise.all([
      userRepository.verifyEmail(user),
      tfa.tfaStrategyService.createStrategy({
        userId: user.id,
        username: user.username,
        type: tfa.TfaStrategy.Type.Email
      })
    ]);

    return true;
  }

  /**
   * Gets the user that has an active accounts with the given public key.
   *
   * @param {string} publicKey The public key of the account to search by.
   */
  async getByAccountPublicKey(publicKey, { withTfaStrategies = false } = {}) {
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
