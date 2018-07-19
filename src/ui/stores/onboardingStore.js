import { action, observable, computed } from 'mobx';
import { usersApi } from '../api';

import history from '../history';
export default class OnboardingStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  listenForEmailVerification(callback) {
    this.emailVerificationCallback = callback;
    this.checkEmailVerificationStatus();
    const intervalId = setInterval(this.checkEmailVerificationStatus, 5000);
    return () => {
      this.emailVerificationCallback = null;
      clearInterval(intervalId);
    };
  }

  @action
  checkEmailVerificationStatus = async () => {
    const user = await usersApi.me();
    if (user.isEmailVerified) {
      this.setEmailVerified();
      this.emailVerificationCallback && this.emailVerificationCallback();
    }
  };

  @action
  setEmailVerified() {
    this.rootStore.currentUser.isEmailVerified = true;
  }

  @action
  gotoVerifyEmail() {
    history.push('/welcome/email');
  }

  @action
  completeVerifyEmail() {
    this.completeStep('verifyEmail');
    this.gotoAddAuthenticatorStep();
  }

  @action
  gotoAddAuthenticatorStep() {
    history.push('/welcome/authenticator');
  }

  @action
  completeAddAuthenticator() {
    this.completeStep('authenticator');
    this.gotoTransactionSecurityStep();
  }

  @action
  gotoTransactionSecurityStep() {
    history.push('/welcome/security');
  }

  @action
  completeTransactionSecurityStep() {
    this.completeStep('transactionSecurity');
    this.gotoRecoveryPhrase();
  }

  @action
  gotoRecoveryPhrase() {
    history.push('/welcome/recovery');
  }

  @action
  completeRecoveryPhrase() {
    this.completeStep('recoveryPhrase');
    history.push('/');
  }

  @action
  async completeStep(step) {
    this.onboardingSettings[step] = true;
    return await usersApi.completeOnboardingStep(step);
  }

  @computed
  get initialRoute() {
    if (!this.isVerifyEmailStepComplete) {
      return '/welcome/email';
    }

    if (!this.isAddAuthenticatorStepComplete) {
      return '/welcome/authenticator';
    }

    if (!this.isTransactionSecurityStepComplete) {
      return '/welcome/security';
    }

    if (!this.isRecoveryPhraseStepComplete) {
      return '/welcome/recovery';
    }

    return '/';
  }

  @computed
  get isVerifyEmailStepComplete() {
    return !!this.onboardingSettings.verifyEmail;
  }

  @computed
  get isAddAuthenticatorStepComplete() {
    return !!this.onboardingSettings.authenticator;
  }

  @computed
  get isTransactionSecurityStepComplete() {
    return !!this.onboardingSettings.transactionSecurity;
  }

  @computed
  get isRecoveryPhraseStepComplete() {
    return !!this.onboardingSettings.recoveryPhrase;
  }

  @computed
  get isOnboardingComplete() {
    return (
      this.isVerifyEmailStepComplete &&
      this.isAddAuthenticatorStepComplete &&
      this.isTransactionSecurityStepComplete &&
      this.isRecoveryPhraseStepComplete
    );
  }

  @computed
  get onboardingSettings() {
    return this.rootStore.currentUser.settings.onboarding;
  }
}
