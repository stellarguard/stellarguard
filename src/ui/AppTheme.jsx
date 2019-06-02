import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#111320',
      secondary: '#576789'
    },
    primary: {
      main: '#003cf8'
    },
    secondary: {
      main: '#f89a00',
      contrastText: '#FFF'
    },
    background: {
      default: '#f2f2fa'
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
