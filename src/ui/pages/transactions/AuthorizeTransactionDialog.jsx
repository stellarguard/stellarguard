import React, { Component } from 'react';
import {
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from 'material-ui';
import { observer } from 'mobx-react';

const styles = theme => ({});

@observer
@withStyles(styles)
class AuthorizeTransactionDialog extends Component {
  handleOk = () => {
    this.props.onOk();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { classes, open, transaction } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">
          Authorize Transaction
        </DialogTitle>
        <DialogContent>
          Authorizing this transaction will sign and submit it to the Stellar
          Network.
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AuthorizeTransactionDialog;
