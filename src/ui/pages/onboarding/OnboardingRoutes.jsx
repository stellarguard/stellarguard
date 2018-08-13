import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import { observer, inject } from 'mobx-react';

import OnboardingVerifyEmailPage from './OnboardingVerifyEmailPage';
import OnboardingAuthenticatorPage from './OnboardingAuthenticatorPage';
import OnboardingTransactionSecurityPage from './OnboardingTransactionSecurityPage';
import OnboardingRecoveryPhrasePage from './OnboardingRecoveryPhrasePage';

@withRouter
@inject('rootStore')
@observer
class OnboardingRoutes extends Component {
  render() {
    const { rootStore } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/welcome/email"
          component={OnboardingVerifyEmailPage}
        />
        <Route
          exact
          path="/welcome/authenticator"
          component={OnboardingAuthenticatorPage}
        />
        <Route
          exact
          path="/welcome/security"
          component={OnboardingTransactionSecurityPage}
        />
        <Route
          exact
          path="/welcome/recovery"
          component={OnboardingRecoveryPhrasePage}
        />

        <Redirect to={rootStore.onboardingStore.initialRoute} />
      </Switch>
    );
  }
}

export default OnboardingRoutes;
