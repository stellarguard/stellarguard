import React, { Component } from 'react';
import {
  withStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  withMobileDialog
} from 'material-ui';
import RegisterForm from './RegisterForm';

import { LogoAvatar } from '../../components';

const styles = theme => ({
  content: {
    width: '520px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    marginRight: theme.spacing.unit
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
        <DialogTitle
          disableTypography
          className={classes.title}
          id="register-dialog"
        >
          <LogoAvatar className={classes.logo} />
          <Typography variant="title">Register for StellarGuard</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your password must be at least 8 characters in length. We strongly
            encourage you to include a combination of letters, numbers, and
            special characters (such as !@#$%^*).
          </DialogContentText>
        </DialogContent>
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
