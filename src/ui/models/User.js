import { observable } from 'mobx';

export default class User {
  @observable username;
  @observable email;
  @observable hasVerifiedEmail;

  constructor({ id, username, email, hasVerifiedEmail = false }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.hasVerifiedEmail = hasVerifiedEmail;
  }

  static fromJson(user) {
    return new User(user);
  }
}
