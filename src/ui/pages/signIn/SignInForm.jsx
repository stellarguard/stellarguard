import React from 'react';
import { Formik, Form } from 'formik';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import yup from 'yup';
import { inject, observer } from 'mobx-react';

import { FormError, FormActions } from '../../components';

const styles = theme => ({});

@inject('rootStore')
@observer
class SignInForm extends React.Component {
  onSubmit = async ({ username, password }, { setSubmitting, setErrors }) => {
    try {
      const user = await this.props.rootStore.sessionStore.signIn({
        username,
        password
      });
      setSubmitting(false);
      this.signInSuccess(user);
    } catch (e) {
      setSubmitting(false);
      setErrors(e);
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
            <FormError errors={errors} />
            <TextField
              fullWidth
              autoFocus
              margin="normal"
              type="text"
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
              type="password"
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
