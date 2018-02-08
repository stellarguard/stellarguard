import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppRoutes from './AppRoutes';

import cx from 'classnames';

import { inject, observer } from 'mobx-react';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%',
    marginLeft: -theme.drawer.width,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

const drawerWidth = 240;

@inject('rootStore')
@observer
class AppContent extends Component {
  render() {
    const { classes, rootStore } = this.props;
    const open = rootStore.uiState.isAppDrawerOpen;

    return (
      <div className={classes.root}>
        <main
          className={cx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <AppRoutes />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(AppContent);
