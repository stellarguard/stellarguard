import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField } from 'material-ui';
import { inject, observer } from 'mobx-react';

import {
  FormError,
  FormActions,
  FormFieldHelperText,
  LoadingButton
} from '../../components';
import { validate } from '../../../shared/validators/resetPassword';

const styles = () => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class ForgotPasswordForm extends React.Component {
  onSubmit = async ({ code, password }, { setSubmitting, setErrors }) => {
    try {
      await this.props.rootStore.userStore.resetPassword({
        code,
        password
      });
      setSubmitting(false);
      this.resetPasswordSuccess();
    } catch (error) {
      setSubmitting(false);
      setErrors(error.toFormError());
    }
  };

  resetPasswordSuccess = () => {
    this.props.onResetPassword && this.props.onResetPassword();
  };

  validate = async data => {
    await validate(data);
  };

  render() {
    const { id = 'reset-password-form', code } = this.props;

    return (
      <Formik
        initialValues={{
          code: code || '',
          password: ''
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
          <Form id={id} noValidate>
            <FormError errors={errors} />
            <TextField
              fullWidth
              required
              margin="normal"
              type="text"
              id="code"
              name="code"
              label="Reset code"
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.code}
              error={!!(touched.code && errors.code)}
              helperText={
                <FormFieldHelperText error={errors.code} touched={touched.code}>
                  {'Enter the code found in your password reset email.'}
                </FormFieldHelperText>
              }
            />
            <TextField
              fullWidth
              required
              margin="normal"
              type="password"
              id="password"
              name="password"
              label="New Password"
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.password}
              error={!!(touched.password && errors.password)}
              helperText={
                <FormFieldHelperText
                  error={errors.password}
                  touched={touched.password}
                >
                  {'Must be at least 8 characters long.'}
                </FormFieldHelperText>
              }
            />
            <FormActions>
              <LoadingButton
                loading={isSubmitting}
                color="primary"
                type="submit"
              >
                Reset Password
              </LoadingButton>
            </FormActions>
          </Form>
        )}
      />
    );
  }
}

export default ForgotPasswordForm;
