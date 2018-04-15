import React, { Component } from 'react';
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from 'material-ui';
import { observer, inject } from 'mobx-react';
import { Formik, Form } from 'formik';

import { FormError, LoadingButton } from '../../components';

const styles = theme => ({});

@inject('rootStore')
@observer
@withStyles(styles)
class NoneAuthorizeDialog extends Component {
  state = { isSubmitting: false };

  render() {
    const { classes, open } = this.props;
    const { isSubmitting } = this.state;
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown open={open}>
        <DialogTitle>Authorize this Transaction?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to authorize this transaction?
          </DialogContentText>
          <Formik
            initialValues={{}}
            onSubmit={this.onSubmit}
            render={({ values, errors, touched, handleChange, handleBlur }) => (
              <Form id="authorize-transaction-form">
                <FormError errors={errors} />
              </Form>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            form="authorize-transaction-form"
            color="primary"
          >
            Ok
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }

  onSubmit = async (_, { setSubmitting, setErrors }) => {
    this.setState({ isSubmitting: true });
    try {
      await this.props.rootStore.transactionsStore.authorize(
        this.props.transaction
      );
      this.setState({ isSubmitting: false });
      setSubmitting(false);
      this.props.onSuccess();
    } catch (e) {
      setErrors(e.toFormError());
      this.setState({ isSubmitting: false });
      setSubmitting(false);
    }
  };

  handleCancel = () => {
    this.props.onCancel();
  };
}

export default NoneAuthorizeDialog;
