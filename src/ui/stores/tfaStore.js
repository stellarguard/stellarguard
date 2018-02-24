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
    });

    return authenticator;
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
}

export default TfaStore;
