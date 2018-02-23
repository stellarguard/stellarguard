const AppError = require('../AppError');

class DuplicateEmailError extends AppError {
  constructor() {
    super({
      code: 4001,
      field: 'email',
      message: 'A user with this email already exists'
    });
  }
}

class InvalidEmailVerificationCodeError extends AppError {
  constructor() {
    super({
      code: 4002,
      field: 'verificationCode',
      message: 'Your verification code is invalid or expired'
    });
  }
}

module.exports = {
  DuplicateEmailError,
  InvalidEmailVerificationCodeError
};
