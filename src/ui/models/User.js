import { observable } from 'mobx';

export default class User {
  @observable email;
  @observable isEmailVerified;
  @observable signerPublicKey;

  constructor({ id, email, isEmailVerified = false, signerPublicKey }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.signerPublicKey = signerPublicKey;
  }

  static fromJson(user) {
    return new User(user);
  }
}
