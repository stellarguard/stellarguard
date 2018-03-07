import React, { Component } from 'react';
import {
  withStyles,
  withMobileDialog,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button
} from 'material-ui';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import config from '../config';

const styles = theme => ({
  publicKey: {
    overflowWrap: 'break-word',
    cursor: 'pointer'
  },
  dialogText: {
    marginBottom: theme.spacing.unit
  }
});

@withMobileDialog()
@withStyles(styles)
class DonateDialog extends Component {
  render() {
    const { open, onClose, classes, fullScreen } = this.props;

    return (
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
        <DialogTitle>Donate to StellarGuard</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogText}>
            Your donations help pay for StellarGuard&apos;s servers and future
            development.
          </DialogContentText>
          <DialogContentText className={classes.dialogText}>
            To donate, send to the following address (click to copy):
          </DialogContentText>
          <CopyToClipboard text={config.stellarGuardPublicKey}>
            <Typography color="primary" className={classes.publicKey}>
              {config.stellarGuardPublicKey}
            </Typography>
          </CopyToClipboard>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DonateDialog;
