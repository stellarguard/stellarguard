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
import { validate } from '../../../../shared/validators/removeAuthenticator';

const styles = () => {};

@withMobileDialog()
@withStyles(styles)
@inject('rootStore')
@observer
class RemoveAuthenticatorDialog extends Component {
  render() {
    const { classes, open, fullScreen } = this.props;
    if (!open) {
      return null;
    }
    return (
      <Dialog open={open} fullScreen={fullScreen} onClose={this.handleClose}>
        <DialogTitle>Remove Authenticator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to remove two factor authentication you must enter your
            current authenticator verification code.
          </DialogContentText>
          <DialogContentText>
            If you no longer have access to your authenticator code, email
            support@stellarguard.me for assistance.
          </DialogContentText>
          <div className={classes.enterCode}>
            <Formik
              initialValues={{
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
                <Form id="remove-authenticator-form" noValidate>
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
          <Button
            type="submit"
            form="remove-authenticator-form"
            color="primary"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleClose = () => {
    this.props.onClose();
  };

  onSubmit = async ({ verificationCode }, { setErrors, setSubmitting }) => {
    try {
      await this.props.rootStore.tfaStore.removeAuthenticator({
        verificationCode
      });
      setSubmitting(false);
      this.props.onClose();
    } catch (error) {
      setErrors(error.toFormError());
      setSubmitting(false);
    }
  };
}

export default RemoveAuthenticatorDialog;
