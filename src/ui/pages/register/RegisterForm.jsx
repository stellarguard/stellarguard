import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField, Button } from 'material-ui';
import { inject, observer } from 'mobx-react';

import { validate } from '../../../shared/validators/users';
import { FormActions, FormFieldHelperText, FormError } from '../../components';

const styles = () => ({});

@inject('rootStore')
@observer
class RegisterForm extends React.Component {
  onSubmit = async ({ password, email }, { setSubmitting, setErrors }) => {
    try {
      const user = await this.props.rootStore.userStore.register({
        password,
        email
      });
      setSubmitting(false);
      this.registerSuccess(user);
    } catch (error) {
      setSubmitting(false);
      setErrors((error.toFormError && error.toFormError()) || error);
    }
  };

  registerSuccess = user => {
    this.props.onRegister && this.props.onRegister(user);
  };

  validate = async user => {
    try {
      await validate(user);
    } catch (e) {
      throw e;
    }
  };

  render() {
    const { includeActions = true } = this.props;

    return (
      <Formik
        initialValues={{
          password: '',
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
          <Form id="register-form" noValidate>
            <FormError errors={errors} />
            <TextField
              data-test="email-field"
              autoFocus
              fullWidth
              margin="normal"
              type="email"
              id="email"
              name="email"
              label="Email address"
              required
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.email}
              error={!!(touched.email && errors.email)}
              helperText={
                <FormFieldHelperText
                  touched={touched.email}
                  error={errors.email}
                >
                  Your email address will be used to sign in and for verifying
                  transactions
                </FormFieldHelperText>
              }
            />
            <TextField
              data-test="password-field"
              fullWidth
              margin="normal"
              type="password"
              id="password"
              name="password"
              label="Password"
              required
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.password}
              error={!!(touched.password && errors.password)}
              helperText={
                <FormFieldHelperText
                  touched={touched.password}
                  error={errors.password}
                >
                  Must be at least 8 characters long
                </FormFieldHelperText>
              }
            />
            {includeActions && (
              <FormActions>
                <Button
                  data-test="register-form-register-button"
                  type="submit"
                  disabled={isSubmitting}
                  variant="raised"
                  color="primary"
                >
                  Register
                </Button>
              </FormActions>
            )}
          </Form>
        )}
      />
    );
  }
}

export default withStyles(styles)(RegisterForm);
