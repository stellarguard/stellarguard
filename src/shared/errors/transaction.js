const AppError = require('./AppError');

class NoUserForSourceError extends AppError {
  constructor() {
    super({
      code: 201,
      message:
        'There is no StellarGuard user associated with the transaction source account.'
    });
  }
}

class VariedSourceAccountsError extends AppError {
  constructor() {
    super({
      code: 202,
      message: `StellarGuard currently does not support operations with a source account that differs from the transaction source account.`
    });
  }
}

class InvalidSignaturesError extends AppError {
  constructor() {
    super({
      code: 203,
      message: `The submitted transaction does not have valid signatures for the source account.`
    });
  }
}

class TransactionNotFoundError extends AppError {
  constructor() {
    super({
      code: 204,
      statusCode: 404,
      message: `Transaction not found.`
    });
  }
}

class TransactionNotOwnedByUserError extends AppError {
  constructor() {
    super({
      code: 205,
      statusCode: 403,
      message: `You are trying to authorize a transaction that does not belong to you.`
    });
  }
}

class InvalidAuthorizationCodeError extends AppError {
  constructor() {
    super({
      code: 206,
      statusCode: 403,
      field: 'code',
      message: `Your authorization code is incorrect or expired.`
    });
  }
}

class TransactionAlreadySubmittedError extends AppError {
  constructor() {
    super({
      code: 207,
      message: `You can only authorize or deny pending transactions.`
    });
  }
}

module.exports = {
  NoUserForSourceError,
  VariedSourceAccountsError,
  InvalidSignaturesError,
  TransactionNotFoundError,
  TransactionNotOwnedByUserError,
  InvalidAuthorizationCodeError,
  TransactionAlreadySubmittedError
};
