const AppError = require('./AppError');

class AuthenticatorCodeRequiredError extends AppError {
  constructor() {
    super({
      code: 5000,
      message: `Authenticator code is required to perform this action.`
    });
  }
}

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
  AuthenticatorCodeRequiredError,
  AuthenticatorVerificationError,
  AuthenticatorAlreadyActiveError,
  AuthenticatorNotActiveError
};
