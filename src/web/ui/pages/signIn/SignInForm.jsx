import React from 'react';
import { Formik, Form } from 'formik';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import yup from 'yup';

import { FormError, FormActions } from '../../components';
import { sessionApi } from '../../api';

const styles = theme => ({});

class SignInForm extends React.Component {
  state = {};

  onSubmit = async ({ username, password }, { setSubmitting, setErrors }) => {
    try {
      const user = await sessionApi.signIn({ username, password });
      setSubmitting(false);
      this.signInSuccess(user);
    } catch (e) {
      setSubmitting(false);
      setErrors({ form: e.response.data.error });
    }
  };

  signInSuccess = user => {
    this.props.onSignIn && this.props.onSignIn(user);
  };

  render() {
    const { classes, includeActions = true } = this.props;

    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={this.onSubmit}
        validationSchema={yup.object().shape({
          username: yup.string().required(),
          password: yup.string().required()
        })}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form id="sign-in-form">
            <FormError>{errors.form}</FormError>
            <TextField
              fullWidth
              autoFocus
              margin="normal"
              variant="text"
              id="username"
              name="username"
              label="Username"
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.username}
              error={!!(touched.username && errors.username)}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="password"
              name="password"
              label="Password"
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.password}
              error={!!(touched.password && errors.password)}
            />
            {includeActions && (
              <FormActions>
                <Button
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

export default withStyles(styles)(SignInForm);
