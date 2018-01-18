const authenticator = require('./authenticator');
const TfaStrategy = require('./TfaStrategy');

class AuthenticatorStrategy extends TfaStrategy {
  constructor({ secret }) {
    super(TfaStrategy.Type.Authenticator);

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

    return authenticator.verifyToken(token, this.secret);
  }
}

module.exports = AuthenticatorStrategy;
