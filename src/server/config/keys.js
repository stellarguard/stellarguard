const StellarSdk = require('stellar-sdk');
const env = require('./env');

class Keys {
  constructor({ signerSecretKey }) {
    this.signerKeyPair = StellarSdk.Keypair.fromSecret(signerSecretKey);
  }

  get signerPublicKey() {
    return this.signerKeyPair.publicKey();
  }

  get signerSecretKey() {
    return this.signerKeyPair.secret();
  }
}

module.exports = new Keys(env);
