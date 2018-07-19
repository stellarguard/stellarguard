import React from 'react';
import { Formik, Form } from 'formik';
import { withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { FormError, TransactionSecurityLevelInput } from './';

const styles = () => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class TransactionSecurityLevelForm extends React.Component {
  onSuccess = transaction => {
    this.props.onSuccess && this.props.onSuccess(transaction);
  };

  onChange = async ({ event, currentValue, newValue }) => {
    await this.props.rootStore.userStore.setTransactionSecurityLevel({
      transactionSecurityLevel: newValue
    });
  };

  onSubmit = () => {};

  render() {
    const { rootStore } = this.props;

    return (
      <Formik
        initialValues={{
          transactionSecurityLevel:
            rootStore.currentUser.transactionSecurityLevel
        }}
        onSubmit={this.onSubmit}
        render={({ values, errors }) => (
          <Form id="transaction-security-level-form" noValidate>
            <FormError errors={errors} />
            <TransactionSecurityLevelInput
              id="transactionSecurityLevel"
              name="transactionSecurityLevel"
              value={rootStore.currentUser.transactionSecurityLevel}
              onChange={event => {
                const currentValue = values.transactionSecurityLevel;
                const newValue = event.target.value;
                this.onChange({ event, currentValue, newValue });
              }}
            />
          </Form>
        )}
      />
    );
  }
}

export { TransactionSecurityLevelForm };
