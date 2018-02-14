import UiStateStore from './uiStateStore';
import SessionStore from './sessionStore';
import UserStore from './userStore';
import TransactionsStore from './transactionsStore';

import { useStrict, computed } from 'mobx';

useStrict(true);

export default class RootStore {
  uiState = new UiStateStore(this);
  sessionStore = new SessionStore(this);
  userStore = new UserStore(this);
  transactionsStore = new TransactionsStore();

  @computed
  get currentUser() {
    return this.sessionStore.currentUser;
  }
}
