import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField, Button } from 'material-ui';
import { inject, observer } from 'mobx-react';

import { validate } from '../../../shared/validators/transactions';
import { FormActions, LoadingButton } from '../../components';

const styles = () => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class SubmitTransactionForm extends React.Component {
  onSubmit = async ({ xdr }, { setSubmitting, setErrors }) => {
    try {
      const user = await this.props.rootStore.transactionsStore.submit({
        xdr
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
          xdr: ''
        }}
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={({
          values,
          errors,
          isValid,
          touched,
          handleChange,
          handleBlur,
          isSubmitting
        }) => (
          <Form id="register-form" noValidate>
            <TextField
              autoFocus
              multiline
              fullWidth
              margin="normal"
              type="text"
              id="xdr"
              name="xdr"
              label="Transaction XDR"
              required
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.xdr}
              error={!!(touched.xdr && errors.xdr)}
              helperText={touched.xdr && errors.xdr}
            />
            {includeActions && (
              <FormActions>
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  color="primary"
                  disabled={!isValid}
                >
                  Submit
                </LoadingButton>
              </FormActions>
            )}
          </Form>
        )}
      />
    );
  }
}

export default SubmitTransactionForm;
