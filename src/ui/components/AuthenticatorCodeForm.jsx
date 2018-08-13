import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Formik, Form } from 'formik';

import { schema } from '../../shared/validators/authenticatorAuthorize';
import { FormError, FormFieldHelperText } from './';

class AuthenticatorCodeForm extends Component {
  render() {
    const { id } = this.props;

    return (
      <Formik
        initialValues={{
          code: ''
        }}
        onSubmit={this.onSubmit}
        validationSchema={schema}
        render={({ values, errors, touched, handleChange, handleBlur }) => {
          const codeError = errors.code || errors.verificationCode;
          return (
            <Form id={id}>
              <FormError errors={errors} />
              <TextField
                fullWidth
                autoFocus
                margin="normal"
                type="text"
                id="code"
                name="code"
                label="Authenticator Code"
                onChange={handleChange}
                inputProps={{ onBlur: handleBlur, maxLength: 6 }}
                value={values.code}
                error={!!(touched.code && codeError)}
                helperText={
                  <FormFieldHelperText error={codeError} touched={touched.code}>
                    Enter the 6-digit code from your authenticator app
                  </FormFieldHelperText>
                }
              />
            </Form>
          );
        }}
      />
    );
  }

  onSubmit = async ({ code }, { setSubmitting, setErrors }) => {
    try {
      await this.props.onSubmit({ code });
    } catch (e) {
      setErrors(e.toFormError());
    } finally {
      setSubmitting(false);
    }
  };
}

export { AuthenticatorCodeForm };
