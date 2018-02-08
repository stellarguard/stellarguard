import { observable, action } from 'mobx';

export default class UiStateStore {
  @observable isSignInDialogOpen = false;

  @observable isRegisterDialogOpen = false;

  @observable isAppDrawerOpen = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
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
}
