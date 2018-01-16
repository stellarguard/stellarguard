const StellarSdk = require('stellar-sdk');

function signTransactionWithSecretKey(transactionEnvelope, signerSecretKey) {
  const signerKeypair = StellarSdk.Keypair.fromSecret(signerSecretKey);
  return signTransactionWithKeyPair(transactionEnvelope, signerKeypair);
}

function signTransactionWithKeyPair(transactionEnvelope, signerKeypair) {
  const transaction = new StellarSdk.Transaction(transactionEnvelope);
  transaction.sign(signerKeypair);
  return transaction;
}

module.exports = {
  signTransactionWithSecretKey,
  signTransactionWithKeyPair
};
