const { multisig, signer } = require('./');
const StellarSdk = require('stellar-sdk');
const server = require('./server').server();
var sourcePublicKey =
  'GCPG4BXCMCD4JSH5EC3SD2HMIGTLNXUZKOUSLP7MEY63HICHNNHI6KO7';

const additionalSignerPublicKey =
  'GCLYZ4CWUFKZZCTJWU4TPODUIODCBBGH3GFLITSYCXIUYOINY4F2ARJ5';

async function buildMultiSigTransaction() {
  const account = await server.loadAccount(sourcePublicKey);
  const transaction = multisig.buildMultiSigTransaction(account, {
    additionalSignerPublicKey: additionalSignerPublicKey
  });

  return transaction;
}

//transaction.toEnvelope().toXDR('base64')

module.exports = {
  makePayment,
  buildMultiSigTransaction,
  testMakePayment
};

async function test() {
  const transaction = await buildMultiSigTransaction();
}

async function testMakePayment() {
  await makePayment(
    'GCPG4BXCMCD4JSH5EC3SD2HMIGTLNXUZKOUSLP7MEY63HICHNNHI6KO7',
    'GBATP7VPADP7Y7EHPWI6HFGOUZPUXKHESTDYOHVQGPDAIPQTCXSSPJDG'
  );
}

async function makePayment(
  fromAccountPublicKey,
  toAccountPublicKey,
  amount = '100'
) {
  const account = await server.loadAccount(fromAccountPublicKey);
  const transaction = new StellarSdk.TransactionBuilder(account)
    .addOperation(
      StellarSdk.Operation.payment({
        destination: toAccountPublicKey,
        amount,
        asset: StellarSdk.Asset.native()
      })
    )
    .build();

  const halfSignedTransaction = signer.signTransactionWithSecretKey(
    transaction.toEnvelope(),
    'SAFBRN2JZFUURTQKNDYJWPGLXVGNBKUVVB32YTJOMKAASVUA57QUFB5G'
  );
  const fullySignedTransaction = signer.signTransactionWithSecretKey(
    halfSignedTransaction.toEnvelope().toXDR('base64'),
    'SAHAT7Y7MFAR6CQHXJIPQBG6OK6AATCIYPK6THMVIFIK5LVDZVJN3I6O'
  );
  console.log(fullySignedTransaction.toEnvelope().toXDR('base64'));
  const result = await server.submitTransaction(fullySignedTransaction);
  console.log(result);
  return result;
}
