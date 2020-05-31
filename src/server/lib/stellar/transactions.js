const StellarSdk = require('stellar-sdk');
const config = require('../../config');
const { hasAccountSignedTransaction } = require('@stellarguard/multisig-utils');


function getNetworkpassphrase() {
  if (config.isTestNetwork) {
    return StellarSdk.Networks.TESTNET;
  } else {
    return StellarSdk.Networks.PUBLIC;
  }
}

function fromXdr(xdr) {
  const passphrase = getNetworkpassphrase();
  return StellarSdk.TransactionBuilder.fromXDR(xdr, passphrase);
}

function toXdr(stellarTransaction) {
  return stellarTransaction.toEnvelope().toXDR('base64');
}

async function submitTransaction(stellarTransaction) {
  const server = require('./server').server();
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
