import { action, computed, observable, runInAction } from 'mobx';

import { tfaApi } from '../api';

class TfaStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async enableAuthenticator({ secret, verificationCode }) {
    const authenticator = await tfaApi.enableAuthenticator({
      secret,
      verificationCode
    });
    runInAction(() => {
      this.rootStore.currentUser.authenticator = authenticator;
      this.onAuthenticatorAdded && this.onAuthenticatorAdded(authenticator);
    });

    return authenticator;
  }

  @action
  async removeAuthenticator({ verificationCode }) {
    await tfaApi.removeAuthenticator({
      verificationCode
    });
    runInAction(() => {
      this.rootStore.currentUser.authenticator = null;
    });
  }

  @observable secret;

  @action
  async generateAuthenticatorSecret() {
    const secret = await tfaApi.generateAuthenticatorSecret();
    this.setSecret(secret);
    return secret;
  }

  @action
  setSecret(secret) {
    this.secret = secret;
  }

  @observable isAddAuthenticatorDialogOpen = false;

  @action
  async openAddAuthenticatorDialog() {
    await this.generateAuthenticatorSecret();
    runInAction(() => (this.isAddAuthenticatorDialogOpen = true));
  }

  @action
  closeAddAuthenticatorDialog() {
    this.isAddAuthenticatorDialogOpen = false;
  }

  @observable isRemoveAuthenticatorDialogOpen = false;

  @action
  openRemoveAuthenticatorDialog() {
    this.isRemoveAuthenticatorDialogOpen = true;
  }

  @action
  closeRemoveAuthenticatorDialog() {
    this.isRemoveAuthenticatorDialogOpen = false;
  }

  listenForAuthenticatorAdded(callback) {
    this.onAuthenticatorAdded = callback;
    return () => {
      this.onAuthenticatorAdded = null;
    };
  }
}

export default TfaStore;
