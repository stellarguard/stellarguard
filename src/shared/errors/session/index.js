const AppError = require('../AppError');
const ms = require('ms');

class RequiresAuthenticatorError extends AppError {
  constructor() {
    super({
      statusCode: 401,
      code: 1000,
      message: 'Enter your authenticator code to sign in.'
    });
  }
}

class InvalidCredentialsError extends AppError {
  constructor() {
    super({
      statusCode: 401,
      code: 1001,
      message: 'Invalid email or password.'
    });
  }
}

class InvalidAuthenticatorCodeError extends AppError {
  constructor() {
    super({
      code: 1002,
      field: 'code',
      message: 'Your authenticator code is invalid or expired.'
    });
  }
}

class RateLimitedError extends AppError {
  constructor({ retryIn }) {
    const time = Math.max(1000, retryIn); // don't show "ms"
    super({
      statusCode: 401,
      code: 1003,
      message: `Too many failed sign-in attempts. Try again in ${ms(time, {
        long: true
      })}.`
    });
  }
}

module.exports = {
  InvalidCredentialsError,
  RequiresAuthenticatorError,
  InvalidAuthenticatorCodeError,
  RateLimitedError
};
