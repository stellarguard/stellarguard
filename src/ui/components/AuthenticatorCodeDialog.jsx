import React, { Component } from 'react';
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import { LoadingButton, AuthenticatorCodeForm } from './';

const styles = theme => ({});

@inject('rootStore')
@observer
@withStyles(styles)
class AuthenticatorCodeDialog extends Component {
  state = { isSubmitting: false };

  render() {
    const { open = false } = this.props;
    const { isSubmitting } = this.state;
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown open={open}>
        <DialogTitle>Enter Authenticator Code</DialogTitle>
        <DialogContent>
          <AuthenticatorCodeForm
            id="authenticator-code-form"
            onSubmit={this.onSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            form="authenticator-code-form"
            color="primary"
          >
            Ok
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }

  onSubmit = async ({ code }) => {
    this.setState({ isSubmitting: true });
    try {
      await this.props.onSubmit({ code });
      this.props.onSuccess && this.props.onSuccess();
    } catch (e) {
      throw e;
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  handleCancel = () => {
    this.props.onClose();
  };
}

export { AuthenticatorCodeDialog };
