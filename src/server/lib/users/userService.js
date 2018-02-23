const userRepository = require('./userRepository');
const { InvalidEmailVerificationCodeError } = require('errors/user');
const passwords = require('./passwords');

const accounts = require('../accounts');
const tfa = require('../tfa');
const stellar = require('../stellar');
const { emailService } = require('../email');
const userValidator = require('./userValidator');

class UserService {
  async createUser({ email, password }) {
    await userValidator.validate({ email, password });
    const passwordHash = await passwords.hash(password);
    const keyPair = stellar.keys.random();
    const user = await userRepository.createUser({
      email,
      passwordHash,
      signerPublicKey: keyPair.publicKey(),
      signerSecretKey: keyPair.secret()
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

  async getUserByEmail(email) {
    return await userRepository.getUserByEmail(email);
  }

  async verifyEmail(user, code) {
    if (!user.verifyEmailCode(code)) {
      throw new InvalidEmailVerificationCodeError();
    }

    await userRepository.verifyEmail(user);
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
