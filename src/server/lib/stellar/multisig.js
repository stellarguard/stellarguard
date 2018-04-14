const StellarSdk = require('stellar-sdk');
const config = require('../../config');
const server = require('./server').server();
const { AppError } = require('errors');

async function buildMultisigTransaction({
  source,
  primarySigner,
  backupSigner
}) {
  try {
    console.log(source, primarySigner, backupSigner);
    const account = await server.loadAccount(source);
    const builder = new StellarSdk.TransactionBuilder(account);

    // by adding a static public key that doesn't enough weight to actually do any signing
    // we make it easier for third parties to check whether StellarGuard is enabled on the account
    builder.addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: config.stellarGuardPublicKey,
          weight: 1
        }
      })
    );

    if (backupSigner) {
      builder.addOperation(
        StellarSdk.Operation.setOptions({
          signer: {
            ed25519PublicKey: backupSigner,
            weight: 20
          }
        })
      );
    }

    builder.addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: primarySigner,
          weight: 10
        },
        masterWeight: 10,
        lowThreshold: 20,
        medThreshold: 20,
        highThreshold: 20
      })
    );

    return builder.build();
  } catch (e) {
    if (e.name === 'NotFoundError') {
      throw new AppError({
        message: 'There is no active Stellar Account with this public key.'
      });
    } else {
      throw e;
    }
  }
}

module.exports = {
  buildMultisigTransaction
};
