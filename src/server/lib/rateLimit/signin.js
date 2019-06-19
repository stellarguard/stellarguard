const { RateLimiter } = require('./RateLimiter');

const emailRateLimiter = RateLimiter.newBuilder()
  .keyPrefix('signin/email/')
  .perMinute(6)
  .build();

const ipAddressRateLimiter = RateLimiter.newBuilder()
  .keyPrefix('signin/ip/')
  .perMinute(50)
  .build();

async function limit(email, ipAddress) {
  const [emailRateLimit, ipRateLimit] = await Promise.all([
    limitByEmail(email),
    limitByIpAddress(ipAddress)
  ]);

  return {
    limited: emailRateLimit.limited || ipRateLimit.limited,
    retryIn: Math.max(emailRateLimit.retryIn, ipRateLimit.retryIn)
  };
}

function limitByIpAddress(ipAddress) {
  return ipAddressRateLimiter.limit(ipAddress);
}

function limitByEmail(email) {
  const key = email.trim().toLowerCase();
  return emailRateLimiter.limit(key);
}

exports.limit = limit;
