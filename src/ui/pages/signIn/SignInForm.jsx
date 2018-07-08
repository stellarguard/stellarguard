import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { Link } from 'react-router-dom';

import { FormError, FormActions, FormFieldHelperText } from '../../components';
import AuthenticatorSignInForm from './AuthenticatorSignInForm';
import signInValidator from '../../../shared/validators/signIn';

const styles = () => ({
  forgotPassword: {
    cursor: 'poinner'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class SignInForm extends React.Component {
  state = {
    showAuthenticatorForm: false
  };

  onSubmit = async (
    { email, password, code },
    { setSubmitting, setErrors }
  ) => {
    try {
      const user = await this.props.rootStore.sessionStore.signIn({
        email,
        password,
        code
      });
      setSubmitting(false);
      this.signInSuccess(user);
    } catch (error) {
      setSubmitting(false);
      if (error.code === 1000) {
        this.setState({ showAuthenticatorForm: true });
      } else {
        setErrors(error.toFormError());
      }
    }
  };

  signInSuccess = user => {
    this.props.onSignIn && this.props.onSignIn(user);
  };

  render() {
    const { includeActions = true, id = 'sign-in-form', classes } = this.props;
    const { showAuthenticatorForm } = this.state;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          code: ''
        }}
        onSubmit={this.onSubmit}
        validationSchema={signInValidator.schema}
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
            {showAuthenticatorForm && (
              <AuthenticatorSignInForm
                errors={errors}
                values={values}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}
            {!showAuthenticatorForm && (
              <React.Fragment>
                <TextField
                  fullWidth
                  autoFocus
                  margin="normal"
                  type="text"
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
                      {' '}
                    </FormFieldHelperText>
                  }
                />
                <TextField
                  fullWidth
                  id="password"
                  margin="normal"
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  inputProps={{ onBlur: handleBlur }}
                  value={values.password}
                  error={!!(touched.password && errors.password)}
                  helperText={
                    <FormFieldHelperText
                      error={errors.password}
                      touched={touched.password}
                    >
                      {' '}
                    </FormFieldHelperText>
                  }
                />
                <Typography
                  component={Link}
                  to="/forgot-password"
                  onClick={this.forgotPassword}
                  className={classes.forgotPassword}
                  color="primary"
                  variant="caption"
                >
                  Forgot your password?
                </Typography>
              </React.Fragment>
            )}
            {includeActions && (
              <FormActions>
                <Button
                  data-test="signin-form-signin-button"
                  type="submit"
                  disabled={isSubmitting}
                  variant="raised"
                  color="primary"
                >
                  Sign in
                </Button>
              </FormActions>
            )}
          </Form>
        )}
      />
    );
  }
}

export default SignInForm;
