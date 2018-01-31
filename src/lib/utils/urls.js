const qs = require('querystring');
const url = require('url');

class Urls {
  withHost(url) {
    return `https://stellarguard.io${url}`;
  }

  verifyEmail({ user }) {
    const pathname = `/users/${user.id}/verifyemail`;
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
