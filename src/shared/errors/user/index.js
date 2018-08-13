const AppError = require('../AppError');

class EmailCodeRequiredError extends AppError {
  constructor() {
    super({
      code: 4000,
      message: 'An email verification code is required for this action.'
    });
  }
}

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

class NoUserForEmail extends AppError {
  constructor() {
    super({
      code: 4003,
      statusCode: 404,
      field: 'email',
      message: 'No user found with this email address'
    });
  }
}

class NoUserForIdError extends AppError {
  constructor() {
    super({
      code: 4004,
      statusCode: 404,
      field: 'id',
      message: 'No user found with this user id.'
    });
  }
}

class NoUserForSignerPublicKeyError extends AppError {
  constructor() {
    super({
      code: 4005,
      statusCode: 404,
      field: 'publicKey',
      message: 'No user found with this StellarGuard public key.'
    });
  }
}

class NoUserForAccountPublicKeyError extends AppError {
  constructor() {
    super({
      code: 4006,
      statusCode: 404,
      field: 'publicKey',
      message: 'No user found with this public key.'
    });
  }
}

class InvalidPasswordResetCodeError extends AppError {
  constructor() {
    super({
      code: 4007,
      field: 'all',
      message: 'Your reset code is invalid.'
    });
  }
}

class PasswordResetCodeExpiredError extends AppError {
  constructor() {
    super({
      code: 4008,
      field: 'code',
      message: 'Reset code has expired.'
    });
  }
}

class CommonPasswordError extends AppError {
  constructor() {
    super({
      code: 4009,
      field: 'password',
      message: 'Your password is a common password, please use another.'
    });
  }
}

class RecaptchaRegisterError extends AppError {
  constructor() {
    super({
      code: 4010,
      message:
        'Google thinks you are a robot. Please try doing some non-robot things and trying again later'
    });
  }
}

module.exports = {
  EmailCodeRequiredError,
  DuplicateEmailError,
  InvalidEmailVerificationCodeError,
  NoUserForEmail,
  NoUserForIdError,
  InvalidPasswordResetCodeError,
  PasswordResetCodeExpiredError,
  CommonPasswordError,
  NoUserForSignerPublicKeyError,
  NoUserForAccountPublicKeyError,
  RecaptchaRegisterError
};
