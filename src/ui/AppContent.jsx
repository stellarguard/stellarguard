import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import AppRoutes from './AppRoutes';
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%',
    flexGrow: 1,
    padding: '0 10%',
    [theme.breakpoints.only('xs')]: {
      padding: '0 2%'
    },
    [theme.breakpoints.only('sm')]: {
      padding: '0 5%'
    }
  }
});

@withRouter
@inject('rootStore')
@observer
class AppContent extends Component {
  renderContent() {
    return <AppRoutes />;
  }

  render() {
    const { classes, rootStore } = this.props;

    return (
      <div className={classes.root}>
        <main className={cx(classes.content)}>{this.renderContent()}</main>
      </div>
    );
  }
}

export default withStyles(styles)(AppContent);
