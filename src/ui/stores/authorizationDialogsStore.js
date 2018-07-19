import { action, observable } from 'mobx';

export class AuthorizationDialogsStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable isAuthenticatorCodeDialogOpen = false;

  @action
  openAuthenticatorCodeDialog({ onSubmit }) {
    this.isAuthenticatorCodeDialogOpen = true;
    this.onSubmitAuthenticatorCode = onSubmit;
  }

  @action
  closeAuthenticatorCodeDialog() {
    this.isAuthenticatorCodeDialogOpen = false;
    this.onSubmitAuthenticatorCode = null;
  }

  @observable isEmailCodeDialogOpen = false;

  @action
  openEmailCodeDialog({ onSubmit }) {
    this.isEmailCodeDialogOpen = true;
    this.onSubmitEmailCode = onSubmit;
  }

  @action
  closeEmailCodeDialog() {
    this.isEmailCodeDialogOpen = false;
    this.onSubmitEmailCode = null;
  }
}
