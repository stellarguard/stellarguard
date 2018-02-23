import { observable, computed, action, runInAction } from 'mobx';
import { sessionApi, usersApi } from '../api';
import history from '../history';

import User from '../models/User';
class CurrentUserCache {
  static UserKey = 'sgUser';

  get() {
    try {
      return User.fromJson(
        JSON.parse(localStorage.getItem(CurrentUserCache.UserKey))
      );
    } catch (e) {
      this.remove();
      return null;
    }
  }

  set(user) {
    if (!user) {
      this.remove();
    } else {
      localStorage.setItem(CurrentUserCache.UserKey, JSON.stringify(user));
    }
  }

  remove() {
    localStorage.removeItem(CurrentUserCache.UserKey);
  }
}

export default class SessionStore {
  currentUserCache = new CurrentUserCache();

  @observable currentUser = null;
  @observable _isSessionLoading = true;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = this.currentUserCache.get();
  }

  @computed
  get isSignedIn() {
    return !!this.currentUser;
  }

  @action
  async loadSession() {
    this.setSessionLoading(true);
    try {
      const user = await sessionApi.getSession();
      this.setCurrentUser(user);
    } catch (e) {
      this.setCurrentUser(null);
    } finally {
      this.setSessionLoading(false);
    }
  }

  @action
  setSessionLoading(isSessionLoading) {
    this._isSessionLoading = isSessionLoading;
  }

  @action
  async signIn({ email, password }) {
    const user = await sessionApi.signIn({ email, password });
    this.setCurrentUser(user);
    return user;
  }

  @observable returnUrl;

  @action
  async setReturnUrl(returnUrl) {
    this.returnUrl = returnUrl;
  }

  @action
  async signOut() {
    this.setCurrentUser(null);
    history.push('/');
    await sessionApi.signOut();
  }

  @computed
  get isSessionLoading() {
    return !this.isSignedIn && this._isSessionLoading;
  }

  @action
  setCurrentUser(user) {
    this.currentUser = user;
    this.currentUserCache.set(user);
  }

  @action
  async resendVerifyEmailAddressEmail() {
    await usersApi.resendVerifyEmailAddressEmail();
  }

  @action
  async verifyEmailAddress({ code }) {
    await usersApi.verifyEmailAddress({ code });
    runInAction(() => {
      this.currentUser.isEmailVerified = true;
    });
  }
}
