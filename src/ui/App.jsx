import React from 'react';
import { CssBaseline } from '@material-ui/core';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppTheme from './AppTheme';
import AppContent from './AppContent';
import AppDialogs from './AppDialogs';
import AppSnackbar from './AppSnackbar';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

@withRouter
@inject('rootStore')
@observer
class App extends React.Component {
  componentDidMount() {
    this.props.rootStore.sessionStore.loadSession();
  }

  render() {
    return (
      <AppTheme>
        <CssBaseline />
        <AppDialogs />
        <AppSnackbar />
        <AppHeader />
        <AppContent />
        <AppFooter />
      </AppTheme>
    );
  }
}

export default App;
