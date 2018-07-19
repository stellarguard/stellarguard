const passwords = require('./passwords');
const { emailOtp } = require('../utils');
const { Settings } = require('./Settings');

// interface IUser {
//   id: number,
//   username: string,
//   email: string,
//   isEmailVerified: boolean,
//   passwordHash: string,
//   externalId: string
//   settings: Settings

//   // relations
//   stellarAccounts: StellarAccount[];
//   authenticator: Authenticator

// }

class User {
  constructor({
    id,
    email,
    isEmailVerified = false,
    passwordHash,
    signerPublicKey,
    encryptedSignerSecretKey,
    encryptedRecoveryPhrase,
    transactionSecurityLevel,
    authenticator,
    accounts,
    transactions,
    externalId,
    settings = {}
  }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.passwordHash = passwordHash;
    this.signerPublicKey = signerPublicKey;
    this.encryptedSignerSecretKey = encryptedSignerSecretKey;
    this.encryptedRecoveryPhrase = encryptedRecoveryPhrase;
    this.transactionSecurityLevel = transactionSecurityLevel;
    this.authenticator = authenticator;
    this.accounts = accounts;
    this.transactions = transactions;
    this.externalId = externalId;
    this.settings = new Settings(settings);
  }

  async verifyPassword(password) {
    return await passwords.compare(password, this.passwordHash);
  }

  get emailVerificationCode() {
    return emailOtp.generateToken(this.otpSecret, {
      suffix: this.email
    });
  }

  verifyEmailCode(code) {
    return emailOtp.verifyToken(code, this.otpSecret, {
      suffix: this.email
    });
  }

  get otpSecret() {
    return this.encryptedSignerSecretKey; // we just need some secret source of randomness per account
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      isEmailVerified: this.isEmailVerified,
      signerPublicKey: this.signerPublicKey,
      authenticator: this.authenticator,
      accounts: this.accounts,
      transactionSecurityLevel: this.transactionSecurityLevel,
      transactions: this.transactions,
      externalId: this.externalId,
      settings: this.settings
    };
  }
}

module.exports = User;
