import { observable, computed, action } from 'mobx';
import { sessionApi } from '../api';

export default class SessionStore {
  @observable currentUser = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get isSignedIn() {
    return !!this.currentUser;
  }

  @action
  async signIn({ username, password }) {
    const user = await sessionApi.signIn({ username, password });
    this.setCurrentUser(user);
    return user;
  }

  @action
  async signOut() {
    await sessionApi.signOut();
    this.setCurrentUser(null);
  }

  @action
  setCurrentUser(user) {
    this.currentUser = user;
  }
}
