import React, { Component } from 'react';
import {
  withStyles,
  Menu,
  MenuItem,
  Button,
  Divider,
  Hidden
} from 'material-ui';
import { AccountCircle, Add } from 'material-ui-icons';
import { inject, observer } from 'mobx-react';

import { ButtonLink } from '../components';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

@inject('rootStore')
@observer
class ToolbarActions extends Component {
  state = {};

  handleUserMenuOpen = event => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  handleUserMenuClose = () => {
    this.setState({ menuAnchor: null });
  };

  handleSignOutClick = () => {
    this.handleUserMenuClose();
    this.props.rootStore.sessionStore.signOut();
  };

  render() {
    const { classes, rootStore } = this.props;
    const { menuAnchor } = this.state;
    if (rootStore.sessionStore.isSignedIn) {
      return (
        <div>
          {rootStore.currentUser.hasAccounts && (
            <ButtonLink color="inherit" to="/transactions/new" size="small">
              <Add className={classes.leftIcon}>New Transacation</Add>
              <Hidden xsDown>New Transaction</Hidden>
            </ButtonLink>
          )}
          <Button
            color="inherit"
            onClick={this.handleUserMenuOpen}
            size="small"
          >
            <AccountCircle>me</AccountCircle>
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={this.handleUserMenuClose}
          >
            <MenuItem disabled>{rootStore.currentUser.email}</MenuItem>
            <Divider />
            <MenuItem onClick={this.handleSignOutClick}>Sign out</MenuItem>
          </Menu>
        </div>
      );
    }

    return (
      <div>
        <Button
          color="inherit"
          onClick={() => rootStore.uiState.openRegisterDialog()}
        >
          Register
        </Button>
        <Button
          color="inherit"
          onClick={() => rootStore.uiState.openSignInDialog()}
        >
          Sign in
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarActions);
