const StellarSdk = require('stellar-sdk');
const config = require('../../config');

function server() {
  if (config.isTestNetwork) {
    StellarSdk.Network.useTestNetwork();
    return new StellarSdk.Server('https://horizon-testnet.stellar.org');
  } else {
    StellarSdk.Network.usePublicNetwork();
    return new StellarSdk.Server('https://horizon.stellar.org');
  }
}

module.exports = {
  server
};
