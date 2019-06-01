import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#111320',
      secondary: '#576789'
    },
    primary: {
      main: '#090BF6',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#FE8D5C',
      contrastText: '#FFF'
    },
    background: {
      default: '#F2F7FF'
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
