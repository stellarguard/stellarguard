import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField, Button } from 'material-ui';
import { inject, observer } from 'mobx-react';

import { validate } from '../../../shared/validators/users';
import { FormActions } from '../../components';

const styles = () => ({});

@inject('rootStore')
@observer
class RegisterForm extends React.Component {
  onSubmit = async (
    { username, password, email },
    { setSubmitting, setErrors }
  ) => {
    try {
      const user = await this.props.rootStore.userStore.register({
        username,
        password,
        email
      });
      setSubmitting(false);
      this.registerSuccess(user);
    } catch (e) {
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
    const { includeActions = true } = this.props;

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
          isSubmitting
        }) => (
          <Form id="register-form" noValidate>
            <TextField
              autoFocus
              fullWidth
              margin="normal"
              type="text"
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
              type="password"
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
              type="email"
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
