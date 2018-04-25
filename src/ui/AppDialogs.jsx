import React, { Component, Fragment } from 'react';
import { withStyles } from 'material-ui';
import { inject, observer } from 'mobx-react';

import RegisterDialog from './pages/register/RegisterDialog';
import SignInDialog from './pages/signIn/SignInDialog';
import AddAuthenticatorDialog from './pages/dashboard/tfa/AddAuthenticatorDialog';
import RemoveAuthenticatorDialog from './pages/dashboard/tfa/RemoveAuthenticatorDialog';

const styles = () => ({});

@inject('rootStore')
@observer
class AppDialogs extends Component {
  get uiState() {
    return this.props.rootStore.uiState;
  }

  handleSignInClose = () => {
    this.uiState.closeSignInDialog();
  };

  handleSignInSuccess = () => {
    this.uiState.closeSignInDialog();
  };

  handleRegisterClose = () => {
    this.uiState.closeRegisterDialog();
  };

  handleRegisterSuccess = () => {
    this.uiState.closeRegisterDialog();
  };

  handleAddAuthenticatorClose = () => {
    this.props.rootStore.tfaStore.closeAddAuthenticatorDialog();
  };

  handleRemoveAuthenticatorClose = () => {
    this.props.rootStore.tfaStore.closeRemoveAuthenticatorDialog();
  };

  render() {
    const { rootStore } = this.props;

    return (
      <Fragment>
        <SignInDialog
          open={rootStore.uiState.isSignInDialogOpen}
          onClose={this.handleSignInClose}
          onSignIn={this.handleSignInSuccess}
        />

        <RegisterDialog
          open={rootStore.uiState.isRegisterDialogOpen}
          onClose={this.handleRegisterClose}
          onRegister={this.handleRegisterSuccess}
        />

        <AddAuthenticatorDialog
          open={rootStore.tfaStore.isAddAuthenticatorDialogOpen}
          secret={rootStore.tfaStore.secret}
          onClose={this.handleAddAuthenticatorClose}
        />

        <RemoveAuthenticatorDialog
          open={rootStore.tfaStore.isRemoveAuthenticatorDialogOpen}
          onClose={this.handleRemoveAuthenticatorClose}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(AppDialogs);
