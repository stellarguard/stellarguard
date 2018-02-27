import React, { Component } from 'react';
import {
  withStyles,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from 'material-ui';
import { observer, inject } from 'mobx-react';
import { Formik, Form } from 'formik';

import { schema } from '../../../shared/validators/authenticatorAuthorize';
import {
  FormError,
  FormFieldHelperText,
  LoadingButton
} from '../../components';

const styles = theme => ({});

@inject('rootStore')
@observer
@withStyles(styles)
class AuthenticatorAuthorizeDialog extends Component {
  state = { isSubmitting: false };

  render() {
    const { classes, open } = this.props;
    const { isSubmitting } = this.state;
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown open={open}>
        <DialogTitle>Enter Authenticator Code</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              code: ''
            }}
            onSubmit={this.onSubmit}
            validationSchema={schema}
            render={({ values, errors, touched, handleChange, handleBlur }) => (
              <Form id="authorize-transaction-form">
                <FormError errors={errors} />
                <TextField
                  fullWidth
                  autoFocus
                  margin="normal"
                  type="text"
                  id="code"
                  name="code"
                  label="Authenticator Code"
                  onChange={handleChange}
                  inputProps={{ onBlur: handleBlur, maxLength: 6 }}
                  value={values.code}
                  error={!!(touched.code && errors.code)}
                  helperText={
                    <FormFieldHelperText
                      error={errors.code}
                      touched={touched.code}
                    >
                      Enter the 6-digit code from your authenticator app
                    </FormFieldHelperText>
                  }
                />
              </Form>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            form="authorize-transaction-form"
            color="primary"
          >
            Ok
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }

  onSubmit = async ({ code }, { setSubmitting, setErrors }) => {
    this.setState({ isSubmitting: true });
    try {
      await this.props.rootStore.transactionsStore.authorize(
        this.props.transaction,
        {
          code
        }
      );
      this.setState({ isSubmitting: false });
      this.props.onSuccess();
    } catch (e) {
      setErrors(e.toFormError());
    } finally {
      this.setState({ isSubmitting: false });
      setSubmitting(false);
    }
  };

  handleCancel = () => {
    this.props.onCancel();
  };
}

export default AuthenticatorAuthorizeDialog;
