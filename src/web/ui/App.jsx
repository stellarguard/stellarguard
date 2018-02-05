import React from 'react';
import Reboot from 'material-ui/Reboot';
import Button from 'material-ui/Button';
import { BrowserRouter } from 'react-router-dom';

import AppTheme from './AppTheme';
import AppRoutes from './AppRoutes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AppTheme>
          <Reboot />
          <AppRoutes />
        </AppTheme>
      </BrowserRouter>
    );
  }
}

export default App;
