const AppError = require('./AppError');

class RequiredParamError extends AppError {
  constructor({ name }) {
    const message = `"${name}" is a required parameter, but is missing.`;
    super({ message, code: 1 });
  }
}

module.exports = { RequiredParamError };
