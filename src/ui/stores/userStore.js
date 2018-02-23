import { action } from 'mobx';
import { usersApi } from '../api';

export default class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async register({ password, email }) {
    const user = await usersApi.register({ password, email });
    this.rootStore.sessionStore.setCurrentUser(user);
    return user;
  }
}
