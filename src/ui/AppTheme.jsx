import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';

const theme = createMuiTheme({
  drawer: {
    width: 240
  },
  palette: {
    primary: {
      light: '#67daff',
      main: '#00a9f4',
      dark: '#007ac1',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#FFF'
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
