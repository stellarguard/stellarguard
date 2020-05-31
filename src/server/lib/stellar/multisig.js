const StellarSdk = require('stellar-sdk');
const config = require('../../config');
const server = require('./server').server();
const { AppError } = require('errors');
const transactions = require('./transactions');

async function buildMultisigTransaction({
  source,
  primarySignerPublicKey,
  backupSignerPublicKey
}) {
  try {
    const account = await server.loadAccount(source);
    const builder = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: config.networkPassphrase
    }).setTimeout(StellarSdk.TimeoutInfinite);

    const signers = [];

    // by adding a static public key that doesn't enough weight to actually do any signing
    // we make it easier for third parties to check whether StellarGuard is enabled on the account
    const stellarGuardSigner = {
      ed25519PublicKey: config.stellarGuardPublicKey,
      weight: 1
    };
    builder.addOperation(
      StellarSdk.Operation.setOptions({
        signer: stellarGuardSigner
      })
    );
    signers.push(stellarGuardSigner);

    if (backupSignerPublicKey) {
      const backupSigner = {
        ed25519PublicKey: backupSignerPublicKey,
        weight: 20
      };
      builder.addOperation(
        StellarSdk.Operation.setOptions({
          signer: backupSigner
        })
      );
      signers.push(backupSigner);
    }

    const primarySigner = {
      ed25519PublicKey: primarySignerPublicKey,
      weight: 10
    };
    const masterWeight = 10;
    const lowThreshold = 20;
    const medThreshold = 20;
    const highThreshold = 20;

    builder.addOperation(
      StellarSdk.Operation.setOptions({
        signer: primarySigner,
        masterWeight,
        lowThreshold,
        medThreshold,
        highThreshold
      })
    );
    signers.push(primarySigner);

    const transaction = builder.build();
    const xdr = transactions.toXdr(transaction);
    return {
      xdr,
      configuration: {
        signers,
        masterWeight,
        lowThreshold,
        medThreshold,
        highThreshold
      }
    };
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
