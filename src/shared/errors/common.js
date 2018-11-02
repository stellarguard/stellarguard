const AppError = require('./AppError');

class RequiredParamError extends AppError {
  constructor({ name, example }) {
    let message = `"${name}" is a required parameter, but is missing.`;
    if (example) {
      message = `${message} Example: ${example}`;
    }

    super({ message, code: 1 });
  }
}

class NotAuthorizedError extends AppError {
  constructor() {
    const message = 'You are not authorized to do that.';
    super({ message, statusCode: 403 });
  }
}

module.exports = { NotAuthorizedError, RequiredParamError };
