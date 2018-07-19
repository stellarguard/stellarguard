import { observable } from 'mobx';

class Onboarding {
  @observable verifyEmail;
  @observable authenticator;
  @observable transactionSecurity;
  @observable recoveryPhrase;

  constructor({
    verifyEmail = false,
    authenticator = false,
    transactionSecurity = false,
    recoveryPhrase = false
  }) {
    this.verifyEmail = verifyEmail;
    this.authenticator = authenticator;
    this.transactionSecurity = transactionSecurity;
    this.recoveryPhrase = recoveryPhrase;
  }
}

class UserSettings {
  @observable onboarding;

  constructor({ onboarding = {} }) {
    this.onboarding = new Onboarding(onboarding);
  }

  static fromJson(json) {
    return new UserSettings({ ...json });
  }
}

export default UserSettings;
