const { RateLimiter } = require('./RateLimiter');

const authenticatorCodeRateLimiter = RateLimiter.newBuilder()
  .keyPrefix('authenticator/user')
  .perTimePeriod(1, '2m')
  .build();

// prevent the same authenticator code from being used twice in a row
// helps protect against phishing attacks where they will have to collect multiple valid 2fa tokens
// to both sign in and then authorize a transaction
function limitSingleCode(userId, code) {
  return authenticatorCodeRateLimiter.limit(`${userId}/code/${code}`);
}

exports.limitSingleCode = limitSingleCode;

const authenticatorFailedAttemptsRateLimiter = RateLimiter.newBuilder()
  .keyPrefix('authenticator/user/failed')
  .perMinute(5)
  .build();

function peekFailedAttempts(userId) {
  return authenticatorFailedAttemptsRateLimiter.peek(`${userId}`);
}

function limitFailedAttempts(userId) {
  return authenticatorFailedAttemptsRateLimiter.limit(`${userId}`);
}

exports.peekFailedAttempts = peekFailedAttempts;
exports.limitFailedAttempts = limitFailedAttempts;
