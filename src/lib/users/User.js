const passwords = require('./passwords');

class User {
  constructor({ id, username, email, verified = false, passwordHash }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.verified = verified;
    this.passwordHash = passwordHash;
  }

  async isPassword(password) {
    return await passwords.compare(password, this.passwordHash);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      verified: this.verified
    };
  }
}

module.exports = User;
