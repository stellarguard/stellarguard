const passwords = require('./passwords');
const { crypto } = require('../utils');

// interface IUser {
//   id: number,
//   username: string,
//   email: string,
//   isEmailVerified: boolean,
//   passwordHash: string,

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
    authenticator,
    accounts,
    transactions,
    externalId
  }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.passwordHash = passwordHash;
    this.signerPublicKey = signerPublicKey;
    this.encryptedSignerSecretKey = encryptedSignerSecretKey;
    this.encryptedRecoveryPhrase = encryptedRecoveryPhrase;
    this.authenticator = authenticator;
    this.accounts = accounts;
    this.transactions = transactions;
    this.externalId = externalId;
  }

  async verifyPassword(password) {
    return await passwords.compare(password, this.passwordHash);
  }

  get emailVerificationCode() {
    return crypto.getHmac(this.email, 10);
  }

  verifyEmailCode(code) {
    return code === this.emailVerificationCode;
  }

  get transactionVerificationType() {
    if (this.authenticator) {
      return 'authenticator';
    }

    if (this.isEmailVerified) {
      return 'email';
    }

    return 'none';
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      isEmailVerified: this.isEmailVerified,
      signerPublicKey: this.signerPublicKey,
      authenticator: this.authenticator,
      accounts: this.accounts,
      transactionVerificationType: this.transactionVerificationType,
      transactions: this.transactions,
      externalId: this.externalId
    };
  }
}

module.exports = User;
