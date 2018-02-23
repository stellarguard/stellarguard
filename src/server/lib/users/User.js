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
//   tfaStrategies: TfaStrategies[];
// }

class User {
  constructor({
    id,
    email,
    isEmailVerified = false,
    passwordHash,
    signerPublicKey,
    signerSecretKey
  }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.passwordHash = passwordHash;
    this.signerPublicKey = signerPublicKey;
    this.signerSecretKey = signerSecretKey;
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

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      isEmailVerified: this.isEmailVerified,
      signerPublicKey: this.signerPublicKey
    };
  }
}

module.exports = User;
