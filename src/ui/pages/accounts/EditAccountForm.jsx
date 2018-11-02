import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { FormError, FormFieldHelperText } from '../../components';

const styles = () => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class EditAccountForm extends React.Component {
  onSubmit = async ({ name }, { setSubmitting, setErrors }) => {
    try {
      const account = await this.props.rootStore.userStore.editAccount({
        publicKey: this.props.account.publicKey,
        name
      });
      setSubmitting(false);
      this.onSuccess(account);
    } catch (e) {
      setSubmitting(false);
      setErrors(e && e.toFormError());
    }
  };

  onSuccess = account => {
    this.props.onSuccess && this.props.onSuccess(account);
  };

  render() {
    const { account } = this.props;

    return (
      <Formik
        initialValues={{
          name: account.name || ''
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
          <Form id="edit-account-form" noValidate>
            <FormError errors={errors} />
            <TextField
              autoFocus
              fullWidth
              margin="normal"
              type="text"
              id="name"
              name="name"
              label="Account Name"
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur, maxLength: 50 }}
              value={values.name}
              error={!!(touched.name && errors.name)}
              helperText={
                <FormFieldHelperText error={errors.xdr} touched={touched.xdr}>
                  An optional name for your account that is shown instead of the
                  public key.
                </FormFieldHelperText>
              }
            />
          </Form>
        )}
      />
    );
  }
}

export default EditAccountForm;
