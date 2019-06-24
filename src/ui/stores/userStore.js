import { action, runInAction } from 'mobx';
import { usersApi, accountsApi } from '../api';
import { executeRecaptcha } from './recaptcha';
import remove from 'lodash.remove';

export default class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async register({ password, email }) {
    let recaptchaToken = '';
    try {
      recaptchaToken = await executeRecaptcha('register');
    } catch (e) {
      console.error(e);
    }
    const user = await usersApi.register({ password, email, recaptchaToken });
    this.rootStore.sessionStore.setCurrentUser(user);
    return user;
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
  async editAccount({ publicKey, name }) {
    const updatedAccount = await accountsApi.updateAccount({ publicKey, name });
    runInAction(() => {
      const accounts = this.rootStore.currentUser.accounts || [];
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].publicKey === publicKey) {
          accounts[i] = updatedAccount;
        }
      }
    });
    return updatedAccount;
  }

  @action
  async forgotPassword({ email }) {
    await usersApi.forgotPassword({ email });
  }

  @action
  async resetPassword({ code, password }) {
    await usersApi.resetPassword({ code, password });
  }

  @action
  async setTransactionSecurityLevel({ transactionSecurityLevel }) {
    const submit = async ({ code } = {}) => {
      try {
        await usersApi.setTransactionSecurityLevel({
          transactionSecurityLevel,
          code
        });

        runInAction(() => {
          this.rootStore.uiState.showSnackbar({
            message: `Transaction Security Level Changed`,
            duration: 2000,
            variant: 'warning'
          });
          this.rootStore.currentUser.transactionSecurityLevel = transactionSecurityLevel;
        });
      } catch (e) {
        if (e.code === 5000) {
          // AuthenticatorCodeRequiredError
          this.rootStore.authorizationDialogs.openAuthenticatorCodeDialog({
            onSubmit: async ({ code }) => {
              return await submit({ code });
            }
          });
        } else if (e.code === 4000) {
          // EmailCodeRequiredError
          this.rootStore.authorizationDialogs.openEmailCodeDialog({
            onSubmit: async ({ code }) => {
              return await submit({ code });
            }
          });
        } else {
          throw e;
        }
      }
    };

    return await submit();
  }

  @action
  async getRecoveryPhrase() {
    return await usersApi.getRecoveryPhrase();
  }
}
