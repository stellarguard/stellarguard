import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from 'material-ui';
import { Menu as MenuIcon } from 'material-ui-icons';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ToolbarActions from './ToolbarActions';

const styles = theme => ({
  root: {
    width: '100%'
  },
  name: {
    flex: 1,
    textDecoration: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
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
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleToggleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.name}
              component={Link}
              to="/"
            >
              StellarGuard.me
            </Typography>
            <ToolbarActions />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppHeader);
