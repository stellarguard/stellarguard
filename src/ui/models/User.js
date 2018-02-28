import { observable, computed } from 'mobx';
import Authenticator from './Authenticator';
import Account from './Account';

export default class User {
  @observable email;
  @observable isEmailVerified;
  @observable signerPublicKey;
  @observable authenticator;
  @observable accounts;
  @observable transactionVerificationType;

  constructor({
    id,
    email,
    isEmailVerified = false,
    signerPublicKey,
    authenticator,
    accounts,
    transactionVerificationType
  }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.signerPublicKey = signerPublicKey;
    this.authenticator = authenticator;
    this.transactionVerificationType = transactionVerificationType;
    this.accounts = accounts;
  }

  @computed
  get hasAuthenticator() {
    return !!this.authenticator;
  }

  static fromJson(json) {
    if (!json) {
      return;
    }

    const authenticator = Authenticator.fromJson(json.authenticator);
    const accounts = Account.fromJson(json.accounts);
    return new User({ authenticator, accounts, ...json });
  }
}
