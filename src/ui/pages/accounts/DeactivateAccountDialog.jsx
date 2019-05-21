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

import DeactivateAccount from './DeactivateAccount';

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
          <Typography variant="h6">Deactivate Account</Typography>
          <Typography className={classes.publicKey} variant="caption">
            {account.publicKey}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deactivating your account will remove the StellarGuard signers from
            your Stellar account. Your account will no longer be protected by
            StellarGuard.
          </DialogContentText>
          <DeactivateAccount account={account} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" form="submit-transaction-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeactivateAccountDialog;
