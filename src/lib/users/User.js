const passwords = require('./passwords');

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
  constructor({ id, username, email, verified = false, passwordHash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.verified = verified;
    this.passwordHash = passwordHash;
  }

  async verifyPassword(password) {
    return await passwords.compare(password, this.passwordHash);
  }

  toJSON() {
    // TODO -- is this actually a good idea?
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      verified: this.verified
    };
  }
}

module.exports = User;
