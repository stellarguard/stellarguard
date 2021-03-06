class AppError extends Error {
  constructor({ code, field = 'error', message, statusCode = 400 }) {
    super(message);

    this.code = code;
    this.field = field;
    this.message = message;
    this.statusCode = statusCode;
  }

  toFormError() {
    return {
      [this.field]: this.message
    };
  }

  toJSON() {
    return {
      code: this.code,
      field: this.field,
      message: this.message,
      statusCode: this.statusCode
    };
  }
}

module.exports = AppError;
