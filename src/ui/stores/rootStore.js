import UiStateStore from './uiStateStore';
import SessionStore from './sessionStore';
import UserStore from './userStore';
import TransactionsStore from './transactionsStore';
import TfaStore from './tfaStore.js';
import AccountsStore from './accountsStore';
import OnboardingStore from './onboardingStore';
import { AuthorizationDialogsStore } from './authorizationDialogsStore';

import { useStrict, computed, autorun } from 'mobx';

useStrict(true);

export default class RootStore {
  uiState = new UiStateStore(this);
  sessionStore = new SessionStore(this);
  userStore = new UserStore(this);
  transactionsStore = new TransactionsStore(this);
  tfaStore = new TfaStore(this);
  accountsStore = new AccountsStore(this);
  onboardingStore = new OnboardingStore(this);
  authorizationDialogs = new AuthorizationDialogsStore(this);

  @computed
  get currentUser() {
    return this.sessionStore.currentUser;
  }
}
