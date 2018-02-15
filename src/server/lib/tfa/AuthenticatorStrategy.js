const otp = require('./otp');
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

    return otp.verifyToken(token, this.secret);
  }

  static async getExtras({ username }) {
    return await otp.generateSecret(username);
  }
}

module.exports = AuthenticatorStrategy;
