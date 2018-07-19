const otplib = require('otplib');
const crypto = require('crypto');
const ms = require('ms');

const totp = new otplib.totp.TOTP();
const step = 30;
totp.options = {
  crypto,
  digits: 9,
  step,
  window: [ms('1d') / (1000 * step), 1] // valid for 1 day
};

function generateSecret() {
  return otplib.authenticator.generateSecret();
}

function generateToken(secret, { suffix = '' } = {}) {
  return totp.generate(secret + suffix);
}

function verifyToken(token, secret, { suffix = '' } = {}) {
  return totp.check(token, secret + suffix);
}

module.exports = {
  generateSecret,
  generateToken,
  verifyToken
};
