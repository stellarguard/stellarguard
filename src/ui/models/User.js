import { observable, computed } from 'mobx';
import Authenticator from './Authenticator';

export default class User {
  @observable email;
  @observable isEmailVerified;
  @observable signerPublicKey;
  @observable authenticator;
  @observable transactionVerificationType;

  constructor({
    id,
    email,
    isEmailVerified = false,
    signerPublicKey,
    authenticator,
    transactionVerificationType
  }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.signerPublicKey = signerPublicKey;
    this.authenticator = authenticator;
    this.transactionVerificationType = transactionVerificationType;
  }

  @computed
  get hasAuthenticator() {
    return !!this.authenticator;
  }

  static fromJson(json) {
    if (json) {
      const authenticator = Authenticator.fromJson(json.authenticator);
      return new User({ authenticator, ...json });
    }
  }
}
