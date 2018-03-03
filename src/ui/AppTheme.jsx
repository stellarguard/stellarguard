import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';

const theme = createMuiTheme({
  drawer: {
    width: 240
  },
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#2B5283',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#ffcb71',
      main: '#ee9a42',
      dark: '#b76c0e',
      contrastText: '#000'
    }
  }
});

export default class AppTheme extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>{this.props.children}</MuiThemeProvider>
    );
  }
}
