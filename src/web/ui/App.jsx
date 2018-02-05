import React from 'react';
import Reboot from 'material-ui/Reboot';
import Button from 'material-ui/Button';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppTheme from './AppTheme';
import AppRoutes from './AppRoutes';

import RootStore from './stores/rootStore';
import AppDialogs from './AppDialogs';

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Provider rootStore={new RootStore()}>
          <AppTheme>
            <Reboot />
            <AppDialogs />
            <AppHeader />
            <AppRoutes />
            <AppFooter />
          </AppTheme>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
