import React from 'react';
import { Route, Switch, withRouter } from 'react-router';

import HomePage from './pages/home/HomePage';
import FourOhFourPage from './pages/errors/FourOhFourPage';
import SignInPage from './pages/signIn/SignInPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import VerifyEmailPage from './pages/email/VerifyEmailPage';

@withRouter
class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" exact component={SignInPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/verifyemail" component={VerifyEmailPage} />
        <Route component={FourOhFourPage} />
      </Switch>
    );
  }
}

export default AppRoutes;
