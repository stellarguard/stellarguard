import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField, Button } from 'material-ui';
import { inject, observer } from 'mobx-react';
import yup from 'yup';

import { FormError, FormActions } from '../../components';

const styles = () => ({});

@inject('rootStore')
@observer
@withStyles
class AuthorizeTransactionEmailForm extends React.Component {
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
    const { includeActions = true, id = 'sign-in-form' } = this.props;

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
          isSubmitting
        }) => (
          <Form id={id}>
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

export default withStyles(styles)(AuthorizeTransactionEmailForm);
