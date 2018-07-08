import React, { Component } from 'react';
import {
  withStyles,
  withMobileDialog,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { Formik, Form } from 'formik';

import { FormError, FormFieldHelperText } from '../../../components';
import { validate } from '../../../../shared/validators/enableAuthenticator';

const styles = theme => ({
  authenticatorAppLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

@withStyles(styles)
class AuthenticatorAppLink extends Component {
  render() {
    const { classes, href, children } = this.props;
    return (
      <a
        href={href}
        className={classes.authenticatorAppLink}
        target="_blank"
        rel="noopener"
      >
        {children}
      </a>
    );
  }
}

const GoogleAuthenticatorLink = () => (
  <AuthenticatorAppLink href="http://support.google.com/accounts/bin/answer.py?hl=en&answer=1066447">
    Google Authenticator
  </AuthenticatorAppLink>
);

const AuthyLink = () => (
  <AuthenticatorAppLink href="https://authy.com/download/">
    Authy
  </AuthenticatorAppLink>
);

@inject('rootStore')
@observer
@withMobileDialog()
@withStyles(styles)
class AddAuthenticatorDialog extends Component {
  render() {
    const { classes, open, fullScreen, secret = {} } = this.props;
    if (!open) {
      return null;
    }
    return (
      <Dialog open={open} fullScreen={fullScreen} onClose={this.handleClose}>
        <DialogTitle>Enable Authenticator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Authenticator Secret Code: <span>{secret.secret}</span>
          </DialogContentText>
          <img className={classes.qrCode} src={secret.qrCode} />
          <div>
            <DialogContentText>
              1. Install an authenticator app on your mobile device if you don't
              already have one. Choices include: <AuthyLink />,{' '}
              <GoogleAuthenticatorLink />, and many others.
            </DialogContentText>
            <DialogContentText>
              2. Scan the QR code above with your Authenticator app.
            </DialogContentText>
            <DialogContentText>
              3. Write down a copy of the Authenticator Secret Code and store it
              in a safe place. If your phone gets lost, stolen, or erased you
              will need it to set up a new Authenticator app. Note: Google
              Authenticator does <b>NOT</b> allow you to access or back up your
              secret code from within the app, so do it now.
            </DialogContentText>
            <DialogContentText>
              4. Open your authenticator app and enter the 6 digit passcode
              below. Each code is valid for 30 seconds.
            </DialogContentText>
          </div>
          <div className={classes.enterCode}>
            <Formik
              initialValues={{
                secret: secret.secret,
                verificationCode: ''
              }}
              onSubmit={this.onSubmit}
              validate={validate}
              render={({
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              }) => (
                <Form id="enter-code" noValidate>
                  <FormError errors={errors} />
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    label="Authenticator Verification Code"
                    onChange={handleChange}
                    inputProps={{ onBlur: handleBlur, maxLength: 6 }}
                    value={values.verificationCode}
                    error={
                      !!(touched.verificationCode && errors.verificationCode)
                    }
                    helperText={
                      <FormFieldHelperText
                        touched={touched.verificationCode}
                        error={errors.verificationCode}
                      >
                        Enter the verification code from your authenticator app
                      </FormFieldHelperText>
                    }
                  />
                </Form>
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="enter-code" color="primary">
            Enable
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleClose = () => {
    this.props.onClose();
  };

  onSubmit = async (
    { secret, verificationCode },
    { setErrors, setSubmitting }
  ) => {
    try {
      const authenticator = await this.props.rootStore.tfaStore.enableAuthenticator(
        {
          secret,
          verificationCode
        }
      );
      setSubmitting(false);
      this.props.onClose(authenticator);
    } catch (error) {
      setErrors(error.toFormError());
      setSubmitting(false);
    }
  };
}

export default AddAuthenticatorDialog;
