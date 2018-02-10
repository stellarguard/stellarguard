import React, { Component } from 'react';
import {
  withStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from 'material-ui';

import SignInForm from './SignInForm';

const styles = theme => ({
  content: {
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
        onClose={onClose}
        aria-labelledby="sign-in-dialog"
      >
        <DialogTitle id="sign-in-dialog">Sign in to StellarGuard</DialogTitle>
        <DialogContent className={classes.content}>
          <SignInForm
            id="sign-in-form-for-dialog"
            onSignIn={onSignIn}
            includeActions={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" form="sign-in-form-for-dialog">
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(SignInDialog));
