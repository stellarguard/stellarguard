const Email = require('../Email');
const { urls } = require('../../../utils');

class AuthorizeTransactionEmail extends Email {
  constructor({ user, transaction }) {
    console.log(
      'authorizetransactionemail',
      transaction.getAuthorizationCode()
    );
    const to = user.email;
    const from = 'StellarGuard <authorize@stellarguard.me>';
    const authorizeUrl = urls.withHost(
      urls.authorizeTransaction({
        transaction,
        code: transaction.getAuthorizationCode(),
        type: 'email'
      })
    );

    super({ to, from, dir: __dirname, data: { authorizeUrl } });
  }
}

module.exports = AuthorizeTransactionEmail;
