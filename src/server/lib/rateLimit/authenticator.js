const { RateLimiter } = require('./RateLimiter');

const authenticatorRateLimiter = RateLimiter.newBuilder()
  .keyPrefix('authenticator/')
  .perHour(1)
  .build();

// prevent the same authenticator code from being used twice in a row
// helps protect against phishing attacks where they will have to collect multiple valid 2fa tokens
// to both sign in and then authorize a transaction
function limit(userId, code) {
  return authenticatorRateLimiter.limit(`/user/${userId}/code/${code}`);
}

exports.limit = limit;
