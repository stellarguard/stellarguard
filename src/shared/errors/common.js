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

module.exports = { RequiredParamError };
