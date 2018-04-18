import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';

import HomePage from './pages/home/HomePage';
import FourOhFourPage from './pages/errors/FourOhFourPage';
import SignInPage from './pages/signIn/SignInPage';
import ForgotPasswordPage from './pages/signIn/ForgotPasswordPage';
import ResetPasswordPage from './pages/signIn/ResetPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import VerifyEmailPage from './pages/email/VerifyEmailPage';
import SubmitTransactionPage from './pages/transactions/SubmitTransactionPage';
import AuthorizeTransactionPage from './pages/transactions/AuthorizeTransactionPage';
import TransactionsPage from './pages/transactions/TransactionsPage';
import FaqPage from './pages/misc/FaqPage';
import SupportedWallets from './pages/misc/SupportedWalletsPage';
import SettingsPage from './pages/user/SettingsPage';
import TutorialsRoutes from './pages/misc/help/TutorialsRoutes';

import AppLoader from './AppLoader';

@withRouter
@inject('rootStore')
@observer
class AppRoutes extends React.Component {
  render() {
    const isSignedIn = this.props.rootStore.sessionStore.isSignedIn;

    return (
      <Switch>
        {!isSignedIn && <Route path="/" exact component={HomePage} />}
        <Route path="/signin" exact component={SignInPage} />
        <Route
          path="/transactions/new"
          exact
          component={SubmitTransactionPage}
        />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/faq" component={FaqPage} />
        <Route exact path="/supported-wallets" component={SupportedWallets} />
        <Route path="/help" component={TutorialsRoutes} />
        <Route path="/" component={ProtectedRoutes} />
        <Route component={FourOhFourPage} />
      </Switch>
    );
  }
}

@withRouter
@inject('rootStore')
@observer
class ProtectedRoutes extends React.Component {
  render() {
    const { rootStore } = this.props;
    if (rootStore.sessionStore.isSessionLoading) {
      return <AppLoader />;
    }

    if (!rootStore.sessionStore.isSignedIn) {
      rootStore.sessionStore.setReturnUrl(this.props.location);
      return <Redirect to="/signin" />;
    }

    return (
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/transactions" component={TransactionsPage} />
        <Route
          exact
          path="/transactions/:id"
          component={AuthorizeTransactionPage}
        />
        <Route exact path="/verifyemail" component={VerifyEmailPage} />
        <Route component={FourOhFourPage} />
      </Switch>
    );
  }
}

export default AppRoutes;
