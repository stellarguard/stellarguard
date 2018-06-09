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

import history from '../history';
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

  goToSettingsPage = () => {
    this.handleUserMenuClose();
    history.push('/settings');
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
          {rootStore.currentUser.hasAccounts ? (
            <ButtonLink
              color="inherit"
              to="/transactions/new"
              size="small"
              data-test="toolbar-actions-new-transaction"
            >
              <Add className={classes.leftIcon}>New Transacation</Add>
              <Hidden xsDown>New Transaction</Hidden>
            </ButtonLink>
          ) : null}
          <Button
            color="inherit"
            onClick={this.handleUserMenuOpen}
            size="small"
            data-test="toolbar-actions-user-menu-button"
          >
            <AccountCircle>me</AccountCircle>
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={this.handleUserMenuClose}
          >
            <MenuItem
              data-test="toolbar-actions-menu-settings"
              onClick={this.goToSettingsPage}
            >
              Settings
            </MenuItem>
            <Divider />
            <MenuItem
              data-test="toolbar-actions-menu-signout"
              onClick={this.handleSignOutClick}
            >
              Sign out
            </MenuItem>
          </Menu>
        </div>
      );
    }

    return (
      <div>
        <Button
          data-test="toolbar-actions-register"
          color="inherit"
          onClick={() => rootStore.uiState.openRegisterDialog()}
        >
          Register
        </Button>
        <Button
          data-test="toolbar-actions-signin"
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
