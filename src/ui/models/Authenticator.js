import { observable } from 'mobx';

export default class Authenticator {
  @observable id;
  @observable userId;

  constructor({ id, userId }) {
    this.id = id;
    this.userId = userId;
  }

  static fromJson(json) {
    if (json) {
      return new Authenticator(json);
    }
  }
}
