import { action } from 'mobx';
import { usersApi } from '../api';
import config from '../config';

import remove from 'lodash.remove';

export default class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async register({ password, email }) {
    let recaptchaToken = '';
    try {
      recaptchaToken = await this._executeRecaptcha('register');
    } catch (e) {
      console.error(e);
    }
    const user = await usersApi.register({ password, email, recaptchaToken });
    this.rootStore.sessionStore.setCurrentUser(user);
    return user;
  }

  _executeRecaptcha(action) {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(
            config.recaptchaSiteKey,
            {
              action
            }
          );
          resolve(token);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  @action
  addAccount(account) {
    const accounts = this.rootStore.currentUser.accounts || [];
    accounts.push(account);
    this.rootStore.currentUser.accounts = accounts;
  }

  @action
  removeAccount({ publicKey }) {
    const accounts = this.rootStore.currentUser.accounts || [];
    remove(accounts, account => account.publicKey === publicKey);
  }

  @action
  async forgotPassword({ email }) {
    await usersApi.forgotPassword({ email });
  }

  @action
  async resetPassword({ code, password }) {
    await usersApi.resetPassword({ code, password });
  }
}
