import { observable } from 'mobx';

export default class Account {
  @observable
  id;

  @observable
  publicKey;

  @observable
  userId;

  @observable
  name;

  constructor({ id, userId, publicKey, name }) {
    this.id = id;
    this.userId = userId;
    this.publicKey = publicKey;
    this.name = name;
  }

  static fromJson(json) {
    if (!json) {
      return;
    }

    if (Array.isArray(json)) {
      return json.map(account => new Account(account));
    }

    return new Account(json);
  }
}
