const StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();

module.exports = {
  multisig: require('./multisig'),
  signer: require('./signer'),
  transactions: require('./transactions')
};
