const url = require('url');
const config = require('../../config');

class Urls {
  withHost(url) {
    return `${config.domainName}${url}`;
  }

  verifyEmail({ user }) {
    const pathname = `/verifyemail`;
    const query = {
      code: user.emailVerificationCode
    };

    return url.format({
      pathname,
      query
    });
  }

  authorizeTransaction({ transaction, code }) {
    const pathname = `/transactions/${transaction.id}`;
    const query = {};
    if (code) {
      query.code = code;
    }

    return url.format({
      pathname,
      query
    });
  }
}

module.exports = new Urls();
