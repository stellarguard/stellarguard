const StellarSdk = require('stellar-sdk');

function signTransactionWithSecretKey(transaction, signerSecretKey) {
  const signerKeypair = StellarSdk.Keypair.fromSecret(signerSecretKey);
  return signTransactionWithKeyPair(transaction, signerKeypair);
}

function signTransactionWithKeyPair(transaction, signerKeypair) {
  transaction.sign(signerKeypair);
  return transaction;
}

module.exports = {
  signTransactionWithSecretKey,
  signTransactionWithKeyPair
};
