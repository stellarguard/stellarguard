import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ToolbarActions from './ToolbarActions';
import config from '../config';

import { LogoAvatar } from '../components';

const styles = theme => ({
  root: {
    width: '100%'
  },
  logo: {
    width: 26,
    height: 26
  },
  name: {
    marginLeft: 4,
    flex: 1,
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  appBar: {
    backgroundColor: theme.palette.background.default
  },
  toolBar: {
    [theme.breakpoints.only('sm')]: {
      padding: '0 5%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 10%'
    }
  }
});

@inject('rootStore')
@observer
class AppHeader extends Component {
  handleToggleMenuClick = () => {
    this.props.rootStore.uiState.toggleAppDrawer();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          className={classes.appBar}
          elevation={0}
          color="inherit"
        >
          <Toolbar className={classes.toolBar}>
            <LogoAvatar className={classes.logo} />
            <Typography
              variant="h6"
              className={classes.name}
              component={Link}
              to="/"
            >
              StellarGuard
            </Typography>
            <ToolbarActions />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppHeader);
