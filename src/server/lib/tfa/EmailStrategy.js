const TfaStrategy = require('./TfaStrategy');

const { emailService } = require('../email');

class EmailStrategy extends TfaStrategy {
  constructor({ id, userId }) {
    super({ id, userId, type: TfaStrategy.Type.Email });
  }

  async execute({ user, transaction }) {
    // generate passcode, save to db (or some magic with totp?)
    // send or queue email with link to it
    await emailService.sendTransactionAuthorizationEmail({
      user,
      transaction
    });

    return {
      ok: true,
      type: this.type
    };
  }

  async verify({ transaction, code }) {
    return transaction.verifyEmailAuthorizationCode(code);
  }

  static async getExtras({}) {
    return {};
  }
}

module.exports = EmailStrategy;
