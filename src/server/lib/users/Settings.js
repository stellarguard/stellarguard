class Settings {
  constructor({ onboarding } = {}) {
    this.onboarding = new Onboarding(onboarding);
  }
}

const ValidSteps = new Set();
ValidSteps.add('verifyEmail');
ValidSteps.add('authenticator');
ValidSteps.add('transactionSecurity');
ValidSteps.add('recoveryPhrase');

class Onboarding {
  static isValidStep(step) {
    return ValidSteps.has(step);
  }

  constructor({
    verifyEmail = false,
    authenticator = false,
    transactionSecurity = false,
    recoveryPhrase = false
  } = {}) {
    this.verifyEmail = verifyEmail;
    this.authenticator = authenticator;
    this.transactionSecurity = transactionSecurity;
    this.recoveryPhrase = recoveryPhrase;
  }

  completeStep(step) {
    if (Onboarding.isValidStep(step)) {
      this[step] = true;
    }
  }
}

exports.Settings = Settings;
exports.Onboarding = Onboarding;
