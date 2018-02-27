const AppError = require('../AppError');

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

module.exports = {
  InvalidCredentialsError,
  RequiresAuthenticatorError,
  InvalidAuthenticatorCodeError
};
