const { authenticatorOtp } = require('../utils');
const TfaStrategy = require('./TfaStrategy');

class AuthenticatorStrategy extends TfaStrategy {
  constructor({ id, userId, secret }) {
    super({ id, userId, type: TfaStrategy.Type.Authenticator });

    this.secret = secret;
  }

  async execute() {
    return {
      ok: true,
      type: this.type
    };
  }

  async verify({ token }) {
    if (!token) {
      return false;
    }

    return authenticatorOtp.verifyToken(token, this.secret);
  }

  static async getExtras({ email }) {
    return await authenticatorOtp.generateSecret(email);
  }
}

module.exports = AuthenticatorStrategy;
