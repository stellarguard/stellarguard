import React, { Component } from 'react';
import {
  withStyles,
  Button,
  Typography,
  withMobileDialog,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import EditAccountForm from './EditAccountForm';

const styles = theme => ({
  publicKey: {
    overflowWrap: 'break-word'
  }
});

@withMobileDialog()
@withStyles(styles)
@inject('rootStore')
@observer
class DeactivateAccountDialog extends Component {
  render() {
    const { classes, open, account, onClose, fullScreen } = this.props;

    if (!account) {
      return null;
    }
    return (
      <Dialog open={open} fullScreen={fullScreen} onClose={onClose}>
        <DialogTitle disableTypography>
          <Typography variant="title">Edit Account</Typography>
          <Typography className={classes.publicKey} variant="caption">
            {account.publicKey}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditAccountForm account={account} onSuccess={onClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" form="edit-account-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeactivateAccountDialog;
