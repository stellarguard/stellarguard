import { observable } from 'mobx';

export default class User {
  @observable username;
  @observable email;
  @observable hasVerifiedEmail;
  @observable memoText;

  constructor({ id, username, email, memoText, hasVerifiedEmail = false }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.hasVerifiedEmail = hasVerifiedEmail;
    this.memoText = memoText;
  }

  static fromJson(user) {
    return new User(user);
  }
}
