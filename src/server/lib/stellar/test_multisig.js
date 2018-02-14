const { multisig } = require('./');
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
  buildMultiSigTransaction
};
