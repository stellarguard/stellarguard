const StellarSdk = require('stellar-sdk');

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
  return !process.env.USE_STELLAR_PUBLIC_NETWORK;
}

module.exports = {
  server,
  isTestNetwork
};
