import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ToolbarActions from './ToolbarActions';
import config from '../config';

const styles = theme => ({
  root: {
    width: '100%'
  },
  name: {
    flex: 1,
    textDecoration: 'none'
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
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Typography
              variant="h6"
              color="primary"
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
