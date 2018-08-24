const { crypto } = require('../utils');

const passwords = require('./passwords');

const stellar = require('../stellar');
const { emailService } = require('../email');
const { accountsService } = require('../accounts');

const userRepository = require('./userRepository');
const userValidator = require('./userValidator');
const forgotPasswordValidator = require('./forgotPasswordValidator');
const resetPasswordValidator = require('./resetPasswordValidator');
const transactionSecurityLevelValidator = require('./transactionSecurityLevelValidator');

const {
  NoUserForSignerPublicKeyError,
  InvalidEmailVerificationCodeError
} = require('errors/user');

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

  /**
   * Returns the first user in the list of public keys that has an account.
   *
   * @param {string[]} publicKeys
   */
  async getFirstUserByAccountPublicKey(publicKeys) {
    for (const publicKey of publicKeys) {
      const user = await this.getUserByAccountPublicKey(publicKey);
      if (user) {
        user.accounts = await accountsService.getForUser(user);
        return user;
      }
    }
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
    await transactionSecurityLevelValidator.validate({
      user,
      transactionSecurityLevel,
      code
    });

    return await userRepository.setTransactionSecurityLevel({
      id: user.id,
      transactionSecurityLevel
    });
  }

  async getRecoveryPhrase(user) {
    // we give them only one chance to see their phrase (during onboarding)
    if (user.settings.onboarding.recoveryPhrase) {
      return {};
    }

    // users that signed up before we started generated this will not have a recovery phrase
    if (user.encryptedRecoveryPhrase) {
      const recoveryPhrase = await crypto.decrypt(user.encryptedRecoveryPhrase);
      return { recoveryPhrase: recoveryPhrase.split(' ') };
    } else {
      const secretKey = await crypto.decrypt(user.encryptedSignerSecretKey);
      return { secretKey };
    }
  }
}

module.exports = new UserService();
