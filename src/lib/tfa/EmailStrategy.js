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
      to: user.email,
      transactionId: transaction.id
    });

    return {
      ok: true,
      type: this.type
    };
  }

  async verify({ token }) {
    // TODO -- implement
    return true;
  }

  static async getExtras({}) {
    return {};
  }
}

module.exports = EmailStrategy;
