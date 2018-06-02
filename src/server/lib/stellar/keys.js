const StellarSdk = require('stellar-sdk');
const StellarHDWallet = require('stellar-hd-wallet');

function random() {
  return StellarSdk.Keypair.random();
}

// generates a random stellar hd key and mnemonic
function hdRandom() {
  const mnemonic = StellarHDWallet.generateMnemonic(); // 24 words
  const wallet = StellarHDWallet.fromMnemonic(mnemonic);
  const keypair = wallet.getKeypair(0);
  return {
    mnemonic,
    keypair
  };
}

module.exports = {
  random,
  hdRandom
};
