import React from 'react';
import Reboot from 'material-ui/Reboot';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppTheme from './AppTheme';
import AppContent from './AppContent';
import AppDialogs from './AppDialogs';

import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class App extends React.Component {
  componentDidMount() {
    this.props.rootStore.sessionStore.getSession();
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
