const StellarSdk = require('stellar-sdk');
const env = require('./env');

const devModeSignerSecretKey =
  'SAHAT7Y7MFAR6CQHXJIPQBG6OK6AATCIYPK6THMVIFIK5LVDZVJN3I6O';
class Keys {
  constructor({ signerSecretKey = devModeSignerSecretKey }) {
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
