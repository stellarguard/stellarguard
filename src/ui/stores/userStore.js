import { observable, computed, action } from 'mobx';
import { usersApi } from '../api';

export default class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async register({ username, password, email }) {
    const user = await usersApi.register({ username, password, email });
    this.rootStore.sessionStore.setCurrentUser(user);
    return user;
  }
}
