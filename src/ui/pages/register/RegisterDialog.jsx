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
import RegisterForm from './RegisterForm';

const styles = theme => ({
  content: {
    width: '520px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  }
});

class RegisterDialog extends Component {
  render() {
    const { classes, onRegister, onClose, open, fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="register-dialog"
      >
        <DialogTitle id="register-dialog">Register</DialogTitle>
        <DialogContent className={classes.content}>
          <RegisterForm onRegister={onRegister} includeActions={false} />
        </DialogContent>
        <DialogActions>
          <Button tabIndex={-1} onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" form="register-form">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(RegisterDialog));
