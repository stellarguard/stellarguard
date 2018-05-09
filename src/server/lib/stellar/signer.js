const StellarSdk = require('stellar-sdk');

function signTransactionWithSecretKey(transaction, signerSecretKey) {
  const signerKeypair = StellarSdk.Keypair.fromSecret(signerSecretKey);
  return signTransactionWithKeyPair(transaction, signerKeypair);
}

function signTransactionWithKeyPair(transaction, signerKeypair) {
  transaction.sign(signerKeypair);
  return transaction;
}

function addSignature(transaction, signatureXdr) {
  var buffer = new Buffer(signatureXdr, 'base64');
  var signature = StellarSdk.xdr.DecoratedSignature.fromXDR(buffer);
  transaction.signatures.push(signature);
  return transaction;
}

function getSignatureForPublicKey(transaction, publicKey) {
  const signerHint = StellarSdk.Keypair.fromPublicKey(publicKey)
    .signatureHint()
    .toString('hex');
  const signature = transaction.signatures.find(
    signature => signature.hint().toString('hex') === signerHint
  );

  if (signature) {
    return signature.toXDR().toString('base64');
  }
}

module.exports = {
  signTransactionWithSecretKey,
  signTransactionWithKeyPair,
  addSignature,
  getSignatureForPublicKey
};
