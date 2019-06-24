import React, { Component } from 'react';

import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Warning as WarningIcon
} from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import {
  withStyles,
  Snackbar as MuiSnackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core';

import { lighten } from '@material-ui/core/styles/colorManipulator';

import cx from 'classnames';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const contentStyles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: lighten(theme.palette.primary.main, 0.1)
  },
  warning: {
    backgroundColor: theme.palette.secondary.light
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
});

@withStyles(contentStyles)
class SnackbarContentWrapper extends Component {
  render() {
    const {
      classes,
      className,
      message,
      onClose,
      variant = 'info',
      ...rest
    } = this.props;
    const Icon = variantIcon[variant];
    return (
      <SnackbarContent
        className={cx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.messageWrapper}>
            <Icon className={cx(classes.icon, classes.iconVariant)} />
            <div>{message}</div>
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...rest}
      />
    );
  }
}

class Snackbar extends Component {
  handleClose = (event, reason) => {
    if (this.props.modal && reason === 'clickaway') {
      return;
    }

    this.props.onClose();
  };

  render() {
    const {
      open,
      children,
      duration,
      position = { vertical: 'top', horizontal: 'center' },
      modal,
      ...rest
    } = this.props;
    return (
      <MuiSnackbar
        anchorOrigin={position}
        open={open}
        autoHideDuration={duration}
        onClose={this.handleClose}
      >
        <SnackbarContentWrapper
          onClose={this.handleClose}
          message={children}
          {...rest}
        />
      </MuiSnackbar>
    );
  }
}

export default Snackbar;
