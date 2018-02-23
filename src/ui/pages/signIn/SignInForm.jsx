import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField, Button } from 'material-ui';
import { inject, observer } from 'mobx-react';

import { FormError, FormActions, FormFieldHelperText } from '../../components';
import signInValidator from '../../../shared/validators/signIn';

const styles = () => ({});

@inject('rootStore')
@observer
class SignInForm extends React.Component {
  onSubmit = async ({ email, password }, { setSubmitting, setErrors }) => {
    try {
      const user = await this.props.rootStore.sessionStore.signIn({
        email,
        password
      });
      setSubmitting(false);
      this.signInSuccess(user);
    } catch (error) {
      setSubmitting(false);
      setErrors(error.toFormError());
    }
  };

  signInSuccess = user => {
    this.props.onSignIn && this.props.onSignIn(user);
  };

  render() {
    const { includeActions = true, id = 'sign-in-form' } = this.props;

    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
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
