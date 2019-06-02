import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#111320',
      secondary: '#576789'
    },
    primary: {
      main: '#0607ac',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#fb8313',
      contrastText: '#FFF'
    },
    background: {
      default: '#f2f7ff'
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
