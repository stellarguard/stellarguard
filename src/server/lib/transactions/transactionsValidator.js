const sharedValidator = require('validators/transactions');
const {
  NoUserForSourceError,
  VariedSourceAccountsError,
  InvalidSignaturesError
} = require('errors/transaction');

async function validate(transaction) {
  const errors = await sharedValidator.validate({ xdr: transaction.xdr });
  if (Object.keys(errors).length) {
    throw errors;
  }

  if (!transaction.userId) {
    throw new NoUserForSourceError();
  }

  if (transaction.hasVariedSourceAccounts()) {
    throw new VariedSourceAccountsError();
  }

  if (!await transaction.hasValidSignatures()) {
    throw new InvalidSignaturesError();
  }
}

exports.validate = validate;
