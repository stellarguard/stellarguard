import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';

import SignInForm from './SignInForm';

const styles = theme => ({
  dialog: {
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  }
});

class SignInDialog extends Component {
  render() {
    const { classes, onSignIn, onClose, open, fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        className={classes.dialog}
        onClose={onClose}
        aria-labelledby="sign-in-dialog"
      >
        <DialogTitle id="sign-in-dialog">Sign in to StellarGuard</DialogTitle>
        <DialogContent>
          <SignInForm onSignIn={onSignIn} includeActions={false} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" form="sign-in-form">
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(SignInDialog));
