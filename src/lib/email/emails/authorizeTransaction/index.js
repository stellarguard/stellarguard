const Email = require('../Email');
const { urls } = require('../../../utils');

class AuthorizeTransactionEmail extends Email {
  constructor({ user, transaction }) {
    const to = user.email;
    const from = 'StellarGuard <authorize@stellarguard.io>';
    const authorizeUrl = urls.withHost(
      urls.authorizeTransaction({
        transaction,
        code: transaction.authorizationCode,
        type: 'email'
      })
    );

    super({ to, from, dir: __dirname, data: { authorizeUrl } });
  }
}

module.exports = AuthorizeTransactionEmail;
