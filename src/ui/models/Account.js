import { observable } from 'mobx';

export default class Account {
  @observable id;
  @observable publicKey;
  @observable userId;

  constructor({ id, userId, publicKey }) {
    this.id = id;
    this.userId = userId;
    this.publicKey = publicKey;
  }

  static fromJson(account) {
    return new Account(account);
  }
}
