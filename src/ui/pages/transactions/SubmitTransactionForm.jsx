import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles, TextField, Button } from 'material-ui';
import { inject, observer } from 'mobx-react';

import { validate } from '../../../shared/validators/transactions';
import {
  FormActions,
  FormError,
  FormFieldHelperText,
  LoadingButton
} from '../../components';

const styles = () => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class SubmitTransactionForm extends React.Component {
  onSubmit = async ({ xdr }, { setSubmitting, setErrors }) => {
    try {
      const transaction = await this.props.rootStore.transactionsStore.submit({
        xdr
      });
      setSubmitting(false);
      this.onSuccess(transaction);
    } catch (e) {
      setSubmitting(false);
      setErrors(e.toFormError());
    }
  };

  validate = async user => {
    await validate(user);
  };

  onSuccess = transaction => {
    this.props.onSuccess && this.props.onSuccess(transaction);
  };

  render() {
    const { includeActions = true, xdr } = this.props;

    return (
      <Formik
        initialValues={{
          xdr: xdr || ''
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
          <Form id="submit-transaction-form" noValidate>
            <FormError errors={errors} />
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
              helperText={
                <FormFieldHelperText error={errors.xdr} touched={touched.xdr}>
                  Paste your signed transaction XDR here
                </FormFieldHelperText>
              }
            />
            {includeActions && (
              <FormActions>
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  color="primary"
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
