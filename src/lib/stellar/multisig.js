const StellarSdk = require('stellar-sdk');

function buildMultiSigTransaction(
  account,
  { additionalSignerPublicKey, weight = 1 }
) {
  const builder = new StellarSdk.TransactionBuilder(account);
  builder
    // this operation funds the new account with XLM
    .addOperation(
      StellarSdk.Operation.setOptions({
        masterWeight: 1,
        medThreshold: 2,
        highThreshold: 2,
        signer: {
          ed25519PublicKey: additionalSignerPublicKey,
          weight
        }
      })
    );

  return builder.build();
}

module.exports = {
  buildMultiSigTransaction
};
