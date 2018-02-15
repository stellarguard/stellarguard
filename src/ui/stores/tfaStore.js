import { action, computed, observable } from 'mobx';

import { tfaApi } from '../api';

class TfaStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async enableAuthenticator({ secret, verificationCode }) {
    return await tfaApi.enableAuthenticator({ secret, verificationCode });
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
