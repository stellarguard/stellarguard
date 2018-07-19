const { crypto } = require('../utils');

const passwords = require('./passwords');

const stellar = require('../stellar');
const { emailService } = require('../email');
const { authenticatorService } = require('../tfa');
const userRepository = require('./userRepository');

const userValidator = require('./userValidator');
const forgotPasswordValidator = require('./forgotPasswordValidator');
const resetPasswordValidator = require('./resetPasswordValidator');
const {
  NoUserForSignerPublicKeyError,
  EmailCodeRequiredError,
  InvalidEmailVerificationCodeError
} = require('errors/user');
const {
  AuthenticatorCodeRequiredError,
  AuthenticatorVerificationError,
  AuthenticatorNotActiveError
} = require('errors/authenticator');

class UserService {
  async createUser({ email, password, recaptchaToken, ipAddress }) {
    await userValidator.validate({
      email,
      password,
      recaptchaToken,
      ipAddress
    });
    const passwordHash = await passwords.hash(password);
    const { mnemonic, keypair } = stellar.keys.hdRandom();
    const encryptedSignerSecretKey = await crypto.encrypt(keypair.secret());
    const encryptedRecoveryPhrase = await crypto.encrypt(mnemonic);
    const user = await userRepository.createUser({
      email: email.toLowerCase(),
      passwordHash,
      signerPublicKey: keypair.publicKey(),
      encryptedSignerSecretKey,
      encryptedRecoveryPhrase
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
    const code = await this.generatePasswordResetCode(user);
    await emailService.sendResetPasswordEmail({ user, code });
  }

  async resetPassword({ code, password }) {
    const payload = await this.decryptPasswordResetCode(code);
    await resetPasswordValidator.validate({ code, password, payload });

    const passwordHash = await passwords.hash(password);
    await userRepository.updatePassword({
      id: payload.userId,
      passwordHash
    });
  }

  async generatePasswordResetCode(user) {
    const payload = { userId: user.id, ts: Date.now() };
    return await crypto.encrypt(JSON.stringify(payload));
  }

  async decryptPasswordResetCode(code) {
    try {
      return JSON.parse(await crypto.decrypt(code));
    } catch (e) {
      return;
    }
  }

  async getMultisigSetup({
    publicKey,
    stellarGuardPublicKey,
    backupSignerPublicKey
  }) {
    const user = await this.getUserBySignerPublicKey(stellarGuardPublicKey);
    if (!user) {
      throw new NoUserForSignerPublicKeyError();
    }

    return await stellar.multisig.buildMultisigTransaction({
      source: publicKey,
      primarySignerPublicKey: user.signerPublicKey,
      backupSignerPublicKey: backupSignerPublicKey
    });
  }

  async updateSettings(user) {
    const { id, settings } = user;
    return await userRepository.updateSettings({ id, settings });
  }

  async setTransactionSecurityLevel(user, { transactionSecurityLevel, code }) {
    const validTypes = ['authenticator', 'email', 'none'];
    if (!validTypes.includes(transactionSecurityLevel)) {
      throw new Error(
        `Invalid transaction security level: ${transactionSecurityLevel}`
      );
    }

    const currentTransactionSecurityLevel = user.transactionSecurityLevel;
    if (currentTransactionSecurityLevel === 'authenticator') {
      if (!code) {
        throw new AuthenticatorCodeRequiredError();
      }
      user.authenticator = await authenticatorService.getForUser(user);
      if (!user.authenticator) {
        throw new AuthenticatorNotActiveError();
      }
      if (!authenticatorService.verifyForUser(user, code)) {
        throw new AuthenticatorVerificationError();
      }
    } else if (currentTransactionSecurityLevel === 'email') {
      if (!code) {
        emailService.sendChangeTransactionSecurityLevelEmail({
          user,
          currentTransactionSecurityLevel,
          transactionSecurityLevel
        });
        throw new EmailCodeRequiredError();
      }
      if (!user.verifyEmailCode(code)) {
        throw new InvalidEmailVerificationCodeError();
      }
    }

    return await userRepository.setTransactionSecurityLevel({
      id: user.id,
      transactionSecurityLevel
    });
  }
}

module.exports = new UserService();
