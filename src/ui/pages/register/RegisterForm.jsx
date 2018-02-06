import React from 'react';
import { Formik, Form } from 'formik';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import yup from 'yup';

import { validate } from '../../../validators/users';

import { FormGroup } from 'material-ui/form';

import { FormError, FormActions } from '../../components';
import { usersApi } from '../../api';

const styles = theme => ({});

class RegisterForm extends React.Component {
  state = {};

  onSubmit = async (
    { username, password, email },
    { setSubmitting, setErrors }
  ) => {
    try {
      const user = await usersApi.register({ username, password, email });
      setSubmitting(false);
      this.registerSuccess(user);
    } catch (e) {
      console.error(e);
      setSubmitting(false);
      setErrors(e);
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
    const { classes, includeActions = true } = this.props;

    return (
      <Formik
        initialValues={{
          username: '',
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
          handleSubmit,
          isSubmitting
        }) => (
          <Form id="register-form" noValidate>
            <TextField
              autoFocus
              fullWidth
              margin="normal"
              variant="text"
              id="username"
              name="username"
              label="Username"
              required
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.username}
              error={!!(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="password"
              name="password"
              label="Password"
              required
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.password}
              error={!!(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="email"
              name="email"
              label="Email address"
              required
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.email}
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            {includeActions && (
              <FormActions>
                <Button
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
