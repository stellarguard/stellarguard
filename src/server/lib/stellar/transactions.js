const StellarSdk = require('stellar-sdk');
const server = require('./server').server();

function fromXdr(xdr) {
  return new StellarSdk.Transaction(xdr);
}

function toXdr(stellarTransaction) {
  return stellarTransaction.toEnvelope().toXDR('base64');
}

async function submitTransaction(stellarTransaction) {
  return await server.submitTransaction(stellarTransaction);
}

function isSignedByAccount(transaction, publicKey) {
  const signer = StellarSdk.Keypair.fromPublicKey(publicKey);
  return transaction.signatures.some(signature =>
    signer.verify(transaction.hash(), signature.signature())
  );
}

module.exports = {
  fromXdr,
  toXdr,
  submitTransaction,
  isSignedByAccount
};
