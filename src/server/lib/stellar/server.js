const StellarSdk = require('stellar-sdk');
const config = require('../../config');

function server() {
  if (isTestNetwork()) {
    StellarSdk.Network.useTestNetwork();
    return new StellarSdk.Server('https://horizon-testnet.stellar.org');
  } else {
    StellarSdk.Network.usePublicNetwork();
    return new StellarSdk.Server('https://horizon.stellar.org');
  }
}

function isTestNetwork() {
  return !config.useStellarPublicNetwork;
}

module.exports = {
  server,
  isTestNetwork
};
