const AppError = require('../AppError');

class InvalidCredentialsError extends AppError {
  constructor() {
    super({
      statusCode: 401,
      code: 3001,
      message: 'Invalid email or password.'
    });
  }
}

module.exports = {
  InvalidCredentialsError
};
