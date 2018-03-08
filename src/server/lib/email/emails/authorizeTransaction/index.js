const Email = require('../Email');
const { urls } = require('../../../utils');

class AuthorizeTransactionEmail extends Email {
  constructor({ user, transaction }) {
    const to = user.email;
    const from = 'StellarGuard <no-reply@stellarguard.me>';
    let authorizeUrl;
    let code;
    if (user.transactionVerificationType === 'email') {
      code = transaction.getAuthorizationCode();
      authorizeUrl = urls.withHost(
        urls.authorizeTransaction({
          transaction,
          code
        })
      );
    } else {
      authorizeUrl = urls.withHost(
        urls.authorizeTransaction({
          transaction
        })
      );
    }

    super({ to, from, dir: __dirname, data: { code, authorizeUrl } });
  }
}

module.exports = AuthorizeTransactionEmail;
