const config = require('../../config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.cryptoSecret);

const userRepository = require('./userRepository');
const { InvalidEmailVerificationCodeError } = require('errors/user');
const passwords = require('./passwords');

const stellar = require('../stellar');
const { emailService } = require('../email');
const userValidator = require('./userValidator');
const forgotPasswordValidator = require('./forgotPasswordValidator');
const resetPasswordValidator = require('./resetPasswordValidator');
const { NoUserForIdError } = require('errors/user');

class UserService {
  async createUser({ email, password }) {
    await userValidator.validate({ email, password });
    const passwordHash = await passwords.hash(password);
    const keyPair = stellar.keys.random();
    const user = await userRepository.createUser({
      email: email.toLowerCase(),
      passwordHash,
      signerPublicKey: keyPair.publicKey(),
      signerSecretKey: keyPair.secret()
    });

    emailService.sendWelcomeEmail({ user });

    return user;
  }

  async getUserById(id) {
    return await userRepository.getUserById(id);
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
  async getUserByAccountPublicKey(publicKey) {
    return await userRepository.getUserByAccountPublicKey(publicKey);
  }

  async getUserBySignerPublicKey(publicKey) {
    return await userRepository.getUserBySignerPublicKey(publicKey);
  }

  async getUserByExternalId(externalId) {
    return await userRepository.getUserByExternalId(externalId);
  }

  async forgotPassword({ email }) {
    const user = await userRepository.getUserByEmail(email);
    await forgotPasswordValidator.validate({ email, user });
    const code = this.generatePasswordResetCode(user);
    await emailService.sendResetPasswordEmail({ user, code });
  }

  async resetPassword({ code, password }) {
    const payload = this.decryptPasswordResetCode(code);
    await resetPasswordValidator.validate({ code, password, payload });

    const passwordHash = await passwords.hash(password);
    await userRepository.updatePassword({
      id: payload.userId,
      passwordHash
    });
  }

  generatePasswordResetCode(user) {
    const payload = { userId: user.id, ts: Date.now() };
    return cryptr.encrypt(JSON.stringify(payload));
  }

  decryptPasswordResetCode(code) {
    try {
      return JSON.parse(cryptr.decrypt(code));
    } catch (e) {
      return;
    }
  }

  async getMultisigSetup({ externalId, publicKey, backupSigner }) {
    const user = await this.getUserByExternalId(externalId);
    if (!user) {
      throw new NoUserForIdError();
    }

    const primarySigner = user.signerPublicKey;
    const transaction = await stellar.multisig.buildMultisigTransaction({
      source: publicKey,
      primarySigner,
      backupSigner
    });

    const xdr = stellar.transactions.toXdr(transaction);
    return {
      xdr
    };
  }
}

module.exports = new UserService();
