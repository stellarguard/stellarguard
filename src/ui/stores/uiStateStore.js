import { observable, action, computed } from 'mobx';
import config from '../config';

import AddStellarUiState from './addStellarUiState';

const SCF_BEG_COOKIE = 'show_scf_beg';

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

  @observable snackbar = { open: false };

  @action
  showSnackbar({ message, duration, position, variant }) {
    this.snackbar = {
      message,
      duration,
      position,
      variant,
      open: true
    };
  }

  @action
  closeSnackbar() {
    if (this.snackbar) {
      this.snackbar.open = false;
    }
  }

  @observable showScfBeg = config.showScfBeg && !getCookie(SCF_BEG_COOKIE);

  @action
  closeScfBeg() {
    setCookie(SCF_BEG_COOKIE, 1);
    this.showScfBeg = false;
  }

  @computed
  get shouldShowScfBeg() {
    return this.showScfBeg;
  }
}

function setCookie(name, value, days) {
  let expires;
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(a) {
  var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}
