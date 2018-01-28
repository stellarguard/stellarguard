const TfaStrategy = require('./TfaStrategy');

class EmailStrategy extends TfaStrategy {
  constructor({ id, userId }) {
    super({ id, type: TfaStrategy.Type.Email });

    this.secret = secret;
  }

  async execute() {
    // generate passcode, save to db (or some magic with totp?)
    // send or queue email with link to it
    return {
      ok: true,
      type: this.type
    };
  }

  async verify({ token }) {
    // TODO -- implement
    return false;
  }

  static async getExtras({}) {
    return {};
  }
}

module.exports = EmailStrategy;
