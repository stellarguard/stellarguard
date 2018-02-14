const Email = require('../Email');
const { urls } = require('../../../utils');

class WelcomeEmail extends Email {
  constructor({ user }) {
    const to = user.email;
    const from = 'StellarGuard <welcome@stellarguard.me>';
    const verifyEmailUrl = urls.withHost(urls.verifyEmail({ user }));
    super({ to, from, dir: __dirname, data: { verifyEmailUrl } });
  }
}

module.exports = WelcomeEmail;
