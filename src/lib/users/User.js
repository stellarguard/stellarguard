const passwords = require('./passwords');
const { crypto } = require('../utils');

// interface IUser {
//   id: number,
//   username: string,
//   email: string,
//   emailVerified: boolean,
//   passwordHash: string,

//   // relations
//   stellarAccounts: StellarAccount[];
//   tfaStrategies: TfaStrategies[];
// }

class User {
  constructor({ id, username, email, hasVerifiedEmail = false, passwordHash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.hasVerifiedEmail = hasVerifiedEmail;
    this.passwordHash = passwordHash;
  }

  async verifyPassword(password) {
    return await passwords.compare(password, this.passwordHash);
  }

  get emailVerificationCode() {
    return crypto.getHmac(this.email, 20);
  }

  get memoText() {
    return crypto.getHmac(this.id, 20);
  }

  verifyMemoText(memoText) {
    return memoText === this.memoText;
  }

  verifyEmailCode(code) {
    return code === this.emailVerificationCode;
  }

  toJSON() {
    // TODO -- is this actually a good idea?
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      hasVerifiedEmail: this.hasVerifiedEmail
    };
  }
}

module.exports = User;
