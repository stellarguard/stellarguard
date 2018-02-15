class Authenticator {
  constructor({ id, userId, secret }) {
    this.id = id;
    this.userId = userId;
    this.secret = secret;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId
    };
  }
}

module.exports = Authenticator;
