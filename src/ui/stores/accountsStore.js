import { action, computed, observable } from 'mobx';
import config from '../config';
import StellarSdk from 'stellar-sdk';
import UnknownError from '../../shared/errors/UnknownError';

function server(StellarSdk) {
  if (config.isTestNetwork) {
    StellarSdk.Network.useTestNetwork();
    return new StellarSdk.Server('https://horizon-testnet.stellar.org');
  } else {
    StellarSdk.Network.usePublicNetwork();
    return new StellarSdk.Server('https://horizon.stellar.org');
  }
}

class AccountsStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async getDeactivateAccountTransaction({ publicKey }) {
    const primarySigner = this.rootStore.currentUser.signerPublicKey;
    console.log(primarySigner);
    try {
      const account = await server(StellarSdk).loadAccount(publicKey);
      const builder = new StellarSdk.TransactionBuilder(account);

      builder.addOperation(
        StellarSdk.Operation.setOptions({
          signer: {
            ed25519PublicKey: config.stellarGuardPublicKey,
            weight: 0
          }
        })
      );

      builder.addOperation(
        StellarSdk.Operation.setOptions({
          signer: {
            ed25519PublicKey: primarySigner,
            weight: 0
          },
          masterWeight: 1,
          lowThreshold: 1,
          medThreshold: 1,
          highThreshold: 1
        })
      );

      return builder
        .build()
        .toEnvelope()
        .toXDR('base64');
    } catch (e) {
      console.error(e);
      throw new UnknownError();
    }
  }
}

export default AccountsStore;