const qs = require('querystring');
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

  authorizeTransaction({ transaction, code, type }) {
    const pathname = `/transactions/${transaction.id}/authorize`;
    const query = {};
    if (code) {
      query.code = code;
    }

    if (type) {
      query.type = type;
    }

    return url.format({
      pathname,
      query
    });
  }
}

module.exports = new Urls();
