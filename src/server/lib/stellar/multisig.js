const StellarSdk = require('stellar-sdk');
const config = require('../../config');
const server = require('./server').server();
const accounts = require('./accounts');

async function buildMultiSigTransaction(
  accountPublicKey,
  { memoText, backupSigner }
) {
  const memo = StellarSdk.Memo.text(memoText);
  const account = await server.loadAccount(accountPublicKey);
  const builder = new StellarSdk.TransactionBuilder(account);
  builder.addMemo(memo).addOperation(
    StellarSdk.Operation.setOptions({
      signer: {
        ed25519PublicKey: config.signerPublicKey,
        weight: 1
      }
    })
  );

  if (backupSigner) {
    builder.addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: backupSigner,
          weight: 1
        }
      })
    );
  }

  builder.addOperation(
    StellarSdk.Operation.setOptions({
      masterWeight: 1,
      lowThreshold: 1,
      medThreshold: 2,
      highThreshold: 2
    })
  );

  return builder.build();
}

module.exports = {
  buildMultiSigTransaction
};
