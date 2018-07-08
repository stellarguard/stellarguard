import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import {
  FormError,
  FormActions,
  FormFieldHelperText,
  LoadingButton
} from '../../components';
import { validate } from '../../../shared/validators/forgotPassword';

const styles = () => ({
  forgotPassword: {
    cursor: 'poinner'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class ForgotPasswordForm extends React.Component {
  onSubmit = async ({ email }, { setSubmitting, setErrors }) => {
    try {
      await this.props.rootStore.userStore.forgotPassword({
        email
      });
      setSubmitting(false);
      this.forgotPasswordSuccess();
    } catch (error) {
      setSubmitting(false);
      setErrors(error.toFormError());
    }
  };

  forgotPasswordSuccess = () => {
    this.props.onForgotPassword && this.props.onForgotPassword();
  };

  validate = async data => {
    await validate(data);
  };

  render() {
    const { id = 'forgot-password-form', classes } = this.props;

    return (
      <Formik
        initialValues={{
          email: ''
        }}
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting
        }) => (
          <Form id={id}>
            <FormError errors={errors} />
            <TextField
              fullWidth
              autoFocus
              margin="normal"
              type="email"
              id="email"
              name="email"
              label="Email address"
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.email}
              error={!!(touched.email && errors.email)}
              helperText={
                <FormFieldHelperText
                  error={errors.email}
                  touched={touched.email}
                >
                  {
                    'The email address you used to sign up for your StellarGuard account.'
                  }
                </FormFieldHelperText>
              }
            />
            <FormActions>
              <LoadingButton
                loading={isSubmitting}
                color="primary"
                type="submit"
              >
                Send
              </LoadingButton>
            </FormActions>
          </Form>
        )}
      />
    );
  }
}

export default ForgotPasswordForm;
