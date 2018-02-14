import { action, computed, observable } from 'mobx';
import config from '../config';
import { accountsApi } from '../api';

function server(StellarSdk) {
  if (config.isTestNetwork) {
    StellarSdk.Network.useTestNetwork();
    return new StellarSdk.Server('https://horizon-testnet.stellar.org');
  } else {
    StellarSdk.Network.usePublicNetwork();
    return new StellarSdk.Server('https://horizon.stellar.org');
  }
}

class AddStellarUiState {
  @observable step = 0;
  @observable transaction;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async buildMultiSigTransaction({
    sourceAccount,
    memoText,
    primarySigner,
    backupSigner
  }) {
    const StellarSdk = await import('stellar-sdk');
    const memo = StellarSdk.Memo.text(memoText);
    const account = await server(StellarSdk).loadAccount(sourceAccount);
    const builder = new StellarSdk.TransactionBuilder(account);
    builder.addMemo(memo).addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: primarySigner,
          weight: 1
        },
        masterWeight: 1,
        lowThreshold: 1,
        medThreshold: 2,
        highThreshold: 2
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

    this.transaction = builder.build();
  }

  @computed
  get xdr() {
    if (!this.transaction) {
      return '';
    }

    return this.transaction.toEnvelope().toXDR('base64');
  }

  @action
  goBack() {
    this.gotoStep(this.step - 1);
  }

  @action
  goNext() {
    this.gotoStep(this.step + 1);
  }

  @action
  gotoStep(step) {
    this.step = step;
  }

  @observable isDone = false;

  @action
  done() {
    this.isDone = true;
  }

  @action
  async activateAccount() {
    const publicKey = this.transaction.source;
    this.setActivateAccountStatus('loading');
    try {
      const account = await accountsApi.createAccount({ publicKey });
      this.setActivateAccountStatus('success');
      return account;
    } catch (error) {
      this.setActivateAccountStatus('error', error);
    }
  }

  @observable activateAccountStatus = { status: 'loading' };

  @action
  async setActivateAccountStatus(status, data) {
    this.activateAccountStatus = { status, data };
  }
}

export default AddStellarUiState;
