import { observable, computed, action, runInAction } from 'mobx';
import { sessionApi, usersApi } from '../api';
import history from '../history';
import { executeRecaptcha } from './recaptcha';

import User from '../models/User';
class SessionCache {
  static UserKey = 'sgUser';

  get user() {
    try {
      return User.fromJson(
        JSON.parse(localStorage.getItem(SessionCache.UserKey))
      );
    } catch (e) {
      this.user = null;
      return null;
    }
  }

  set user(user) {
    if (!user) {
      localStorage.removeItem(SessionCache.UserKey);
    } else {
      localStorage.setItem(SessionCache.UserKey, JSON.stringify(user));
    }
  }

  clear() {
    this.user = null;
  }
}

export default class SessionStore {
  sessionCache = new SessionCache();

  @observable currentUser = null;
  @observable _isSessionLoading = true;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentUser = this.sessionCache.user;
  }

  @computed
  get isSignedIn() {
    return !!this.currentUser;
  }

  @action
  async loadSession() {
    this.setSessionLoading(true);
    try {
      const { user } = await sessionApi.getSession();
      this.setCurrentUser(user);
    } catch (e) {
      console.error(e);
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
  async signIn({ email, password, code }) {
    let recaptchaToken = '';
    try {
      recaptchaToken = await executeRecaptcha('signin');
    } catch (e) {
      console.error(e);
    }
    const user = await sessionApi.signIn({
      email,
      password,
      code,
      recaptchaToken
    });
    this.setCurrentUser(user);
    return user;
  }

  @observable returnUrl;

  @action
  setReturnUrl(returnUrl) {
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
    this.sessionCache.user = user;
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
