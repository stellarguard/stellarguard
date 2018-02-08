import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Button from 'material-ui/Button';
import { inject, observer } from 'mobx-react';

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
    this.props.rootStore.sessionStore.signOut();
  };

  render() {
    const { classes, rootStore } = this.props;
    const { menuAnchor } = this.state;
    if (rootStore.sessionStore.isSignedIn) {
      return (
        <div>
          <Button color="inherit" onClick={this.handleUserMenuOpen}>
            <AccountCircle className={classes.leftIcon}>me</AccountCircle>
            {rootStore.sessionStore.currentUser.username}
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={this.handleUserMenuClose}
          >
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
