const { URL } = require('url');

const sharedValidator = require('validators/transactions');
const {
  NoUserForSourceError,
  VariedSourceAccountsError,
  InvalidSignaturesError,
  InvalidCallbackError
} = require('errors/transaction');

async function validate({ transaction, user }) {
  const errors = await sharedValidator.validate({ xdr: transaction.xdr });
  if (Object.keys(errors).length) {
    throw errors;
  }

  if (!transaction.userId) {
    throw new NoUserForSourceError();
  }

  if (transaction.callback) {
    validateCallback(transaction.callback);
  }

  if (!transaction.hasValidSignatures(user)) {
    throw new InvalidSignaturesError();
  }
}

const blacklistedHosts = ['localhost', '127.0.0.1', '0.0.0.0']; // attempt to prevent people creating callbacks to our local network
function validateCallback(callback) {
  const url = new URL(callback);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new InvalidCallbackError({ callback });
  }

  if (blacklistedHosts.includes(url.hostname)) {
    throw new InvalidCallbackError({ callback });
  }
}

exports.validate = validate;
