const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

function fromXdr(xdr) {
  return new StellarSdk.Transaction(xdr);
}

function toXdr(stellarTransaction) {
  return stellarTransaction.toEnvelope().toXDR('base64');
}

async function submitTransaction(stellarTransaction) {
  return await server.submitTransaction(stellarTransaction);
}

module.exports = {
  fromXdr,
  toXdr,
  submitTransaction
};
