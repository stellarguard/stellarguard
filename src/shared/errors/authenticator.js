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

class AuthenticatorAlreadyActiveError extends AppError {
  constructor() {
    super({
      code: 5002,
      message: `You already have an active authenticator.`
    });
  }
}

class AuthenticatorNotActiveError extends AppError {
  constructor() {
    super({
      code: 5003,
      message: `You do not have an active authenticator.`
    });
  }
}

module.exports = {
  AuthenticatorVerificationError,
  AuthenticatorAlreadyActiveError,
  AuthenticatorNotActiveError
};
