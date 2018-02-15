const AppError = require('./AppError');

class AuthenticatorVerificationError extends AppError {
  constructor() {
    super({
      code: 5001,
      field: 'verificationCode',
      message: 'Your verification code is invalid or expired.'
    });
  }
}

module.exports = AuthenticatorVerificationError;
