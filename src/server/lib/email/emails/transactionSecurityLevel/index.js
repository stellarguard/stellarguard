const Email = require('../Email');

class TransactionSecurityLevelEmail extends Email {
  constructor({ user }) {
    const to = user.email;
    const from = 'StellarGuard <no-reply@email.stellarguard.me>';
    const code = user.emailVerificationCode;

    super({ to, from, dir: __dirname, data: { code } });
  }
}

module.exports = TransactionSecurityLevelEmail;
