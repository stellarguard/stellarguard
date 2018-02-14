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

// tests
// no signatures - fail
// one signature, one signer, valid signature - pass
// one signature, one signer, invalid signature - fail
// two signatures, three signers, all valid - pass
// two signatures, three signers, one invalid - fail
async function hasValidSignatures(stellarTransaction) {
  if (
    !stellarTransaction.signatures ||
    stellarTransaction.signatures.length === 0
  ) {
    return false;
  }

  const account = await server.loadAccount(stellarTransaction.source);
  return stellarTransaction.signatures.every(signature => {
    return account.signers.some(requiredSigner => {
      const signer = StellarSdk.Keypair.fromPublicKey(
        requiredSigner.public_key
      );
      return signer.verify(stellarTransaction.hash(), signature.signature());
    });
  });
}

module.exports = {
  fromXdr,
  toXdr,
  submitTransaction,
  hasValidSignatures
};
