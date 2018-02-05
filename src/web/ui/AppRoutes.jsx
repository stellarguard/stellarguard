import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import HomePage from './pages/home/HomePage';
import FourOhFourPage from './pages/errors/FourOhFourPage';
import SignInPage from './pages/signIn/SignInPage';

class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" extend component={SignInPage} />
        <Route component={FourOhFourPage} />
      </Switch>
    );
  }
}

export default AppRoutes;
