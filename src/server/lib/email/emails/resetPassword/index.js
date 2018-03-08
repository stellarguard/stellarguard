const Email = require('../Email');
const { urls } = require('../../../utils');

class ResetPassword extends Email {
  constructor({ user, code }) {
    const to = user.email;
    const from = 'StellarGuard <no-replyd@stellarguard.me>';
    const resetPasswordUrl = urls.withHost(urls.resetPassword({ user, code }));
    super({
      to,
      from,
      dir: __dirname,
      data: { email: user.email, code, resetPasswordUrl }
    });
  }
}

module.exports = ResetPassword;
