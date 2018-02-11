import { observable, action } from 'mobx';

import AddStellarUiState from './addStellarUiState';

export default class UiStateStore {
  @observable isSignInDialogOpen = false;

  @observable isRegisterDialogOpen = false;

  @observable isAppDrawerOpen = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.addStellarUiState = new AddStellarUiState(rootStore);
  }

  @action
  openSignInDialog() {
    this.isSignInDialogOpen = true;
  }

  @action
  closeSignInDialog() {
    this.isSignInDialogOpen = false;
  }

  @action
  openRegisterDialog() {
    this.isRegisterDialogOpen = true;
  }

  @action
  closeRegisterDialog() {
    this.isRegisterDialogOpen = false;
  }

  @action
  openAppDrawer() {
    this.isAppDrawerOpen = false;
  }

  @action
  closeAppDrawer() {
    this.isAppDrawerOpen = true;
  }

  @action
  toggleAppDrawer() {
    this.isAppDrawerOpen = !this.isAppDrawerOpen;
  }

  @observable resendVerifyEmailStatus;

  @action
  setResendVerifyEmailStatus(status) {
    this.resendVerifyEmailStatus = status;
  }
}
