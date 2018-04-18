import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { observer } from 'mobx-react';

import NewTransactionStellarLabsTutorial from './transactions/NewTransactionStellarLabsTutorial';
import FourOhFourPage from '../../errors/FourOhFourPage';

@withRouter
@observer
class TutorialsRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/help/new-transaction-stellar-labs"
          component={NewTransactionStellarLabsTutorial}
        />
        <Route component={FourOhFourPage} />
      </Switch>
    );
  }
}

export default TutorialsRoutes;
