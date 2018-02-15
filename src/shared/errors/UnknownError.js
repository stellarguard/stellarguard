const AppError = require('./AppError');

class UnknownError extends AppError {
  constructor() {
    super({
      code: 9999,
      statusCode: 500,
      message: 'An unknown error has occurred. Please try again later.'
    });
  }
}

module.exports = UnknownError;
