const StellarSdk = require('stellar-sdk');
const config = require('../../config');

function server() {
  if (config.isTestNetwork) {
    return new StellarSdk.Server('https://horizon-testnet.stellar.org');
  } else {
    return new StellarSdk.Server('https://horizon.stellar.org');
  }
}

module.exports = {
  server
};
