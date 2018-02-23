const AppError = require('../AppError');

class DuplicatePublicKeyError extends AppError {
  constructor() {
    super({
      code: 6001,
      message: 'This public key is already active on another account.'
    });
  }
}

module.exports = {
  DuplicatePublicKeyError
};
