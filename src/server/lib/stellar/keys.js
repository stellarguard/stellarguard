const StellarSdk = require('stellar-sdk');

function random() {
  return StellarSdk.Keypair.random();
}

module.exports = {
  random
};
