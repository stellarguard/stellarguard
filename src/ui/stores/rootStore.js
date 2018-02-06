import UiStateStore from './uiStateStore';
import SessionStore from './sessionStore';
import UserStore from './userStore';

export default class RootStore {
  uiState = new UiStateStore(this);
  sessionStore = new SessionStore(this);
  userStore = new UserStore(this);
}
