const Authenticator = require('./Authenticator');

class AuthenticatorRepository {
  constructor() {
    this.authenticatorDb = require('./authenticatorDb');
  }

  async enableAuthenticator(user, { secret }) {
    const userId = user.id;
    const id = this.authenticatorDb.create({ userId: user.id, secret });
    return new Authenticator({ id, userId, secret });
  }
}

module.exports = new AuthenticatorRepository();
