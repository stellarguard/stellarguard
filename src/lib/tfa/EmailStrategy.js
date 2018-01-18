const TfaStrategy = require('./TfaStrategy');

class EmailStrategy extends TfaStrategy {
  constructor({ secret }) {
    super(TfaStrategy.Type.Email);

    this.secret = secret;
  }

  async execute() {
    // generate passcode, save to db
    // send or queue email with link to it
    return {
      ok: true,
      type: this.type
    };
  }

  async verify({ token }) {
    // look up token associated transaction to verify it
  }
}

module.exports = EmailStrategy;
