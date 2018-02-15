import UiStateStore from './uiStateStore';
import SessionStore from './sessionStore';
import UserStore from './userStore';
import TransactionsStore from './transactionsStore';
import TfaStore from './tfaStore.js';

import { useStrict, computed } from 'mobx';

useStrict(true);

export default class RootStore {
  uiState = new UiStateStore(this);
  sessionStore = new SessionStore(this);
  userStore = new UserStore(this);
  transactionsStore = new TransactionsStore();
  tfaStore = new TfaStore();

  @computed
  get currentUser() {
    return this.sessionStore.currentUser;
  }
}
