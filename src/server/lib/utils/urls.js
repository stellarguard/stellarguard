const url = require('url');

class Urls {
  withHost(url) {
    return `https://stellarguard.me${url}`;
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
