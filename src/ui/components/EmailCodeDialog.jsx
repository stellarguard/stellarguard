import React, { Component } from 'react';
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import { LoadingButton, EmailCodeForm } from './';

const styles = theme => ({});

@inject('rootStore')
@observer
@withStyles(styles)
class EmailCodeDialog extends Component {
  state = { isSubmitting: false };

  render() {
    const { open = false, emailAddress } = this.props;
    const { isSubmitting } = this.state;
    const id = 'email-code-form';
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown open={open}>
        <DialogTitle>Enter Email Code</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An email has been sent to {emailAddress} with instructions.
          </DialogContentText>
          <EmailCodeForm id={id} onSubmit={this.onSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            form={id}
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

export { EmailCodeDialog };
