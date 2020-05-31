import { action, computed, observable } from 'mobx';
import config from '../config';
import { accountsApi } from '../api';
import StellarSdk from 'stellar-sdk';
import AppError from '../../shared/errors/AppError';
import UnknownError from '../../shared/errors/UnknownError';

class AddStellarUiState {
  @observable step = 0;
  @observable transaction;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async buildMultiSigTransaction({
    sourceAccount,
    primarySigner,
    backupSigner
  }) {
    try {
      const account = await config.horizonServer.loadAccount(sourceAccount);
      const builder = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: config.networkPassphrase
      }).setTimeout(StellarSdk.TimeoutInfinite);

      // by adding a static public key that doesn't have enough weight to actually do any signing
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

      this.transaction = builder.build();
    } catch (e) {
      if (
        e.response &&
        e.response.type === 'https://stellar.org/horizon-errors/not_found'
      ) {
        throw new AppError({
          field: 'sourceAccount',
          message: 'There is no active Stellar Account with this public key.'
        });
      } else {
        throw new UnknownError();
      }
    }
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

  @action
  async activateAccount() {
    const publicKey = this.transaction.source;
    this.setActivateAccountStatus('loading');
    try {
      const account = await accountsApi.createAccount({ publicKey });
      this.rootStore.userStore.addAccount(account);
      const stellarAccount = await config.horizonServer.loadAccount(publicKey);
      if (doesAccountHaveStellarGuardSharedSigner(stellarAccount)) {
        this.setActivateAccountStatus('success');
      } else {
        this.setActivateAccountStatus('warning');
      }
      return account;
    } catch (error) {
      this.setActivateAccountStatus('error', error);
    }
  }

  @observable activateAccountStatus = { status: 'loading' };

  @action
  setActivateAccountStatus(status, data) {
    this.activateAccountStatus = { status, data };
  }
}

function doesAccountHaveStellarGuardSharedSigner(stellarAccount) {
  return doesAccountHaveSigner(stellarAccount, config.stellarGuardPublicKey);
}

function doesAccountHaveSigner(stellarAccount, requiredSigner) {
  return stellarAccount.signers.some(signer => signer.key === requiredSigner);
}

export default AddStellarUiState;
