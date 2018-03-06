import React from 'react';
import { Reboot } from 'material-ui';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppTheme from './AppTheme';
import AppContent from './AppContent';
import AppDialogs from './AppDialogs';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

import config from './config';

@withRouter
@inject('rootStore')
@observer
class App extends React.Component {
  componentWillMount() {
    if (config.isPublicNetwork) {
      window.location = 'https://test.stellarguard.me';
    }
  }

  componentDidMount() {
    this.props.rootStore.sessionStore.loadSession();
  }

  render() {
    return (
      <AppTheme>
        <Reboot />
        <AppDialogs />
        <AppHeader />
        <AppContent />
        <AppFooter />
      </AppTheme>
    );
  }
}

export default App;
