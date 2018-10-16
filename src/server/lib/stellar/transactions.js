const StellarSdk = require('stellar-sdk');
const server = require('./server').server();
const { hasAccountSignedTransaction } = require('@stellarguard/multisig-utils');

function fromXdr(xdr) {
  return new StellarSdk.Transaction(xdr);
}

function toXdr(stellarTransaction) {
  return stellarTransaction.toEnvelope().toXDR('base64');
}

async function submitTransaction(stellarTransaction) {
  return await server.submitTransaction(stellarTransaction);
}

function isSignedByAccount(transaction, publicKey) {
  return hasAccountSignedTransaction(publicKey, transaction);
}

module.exports = {
  fromXdr,
  toXdr,
  submitTransaction,
  isSignedByAccount
};
