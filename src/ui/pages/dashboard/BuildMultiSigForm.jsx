import React, { Component } from 'react';
import { Form, withFormik } from 'formik';
import StellarSdk from 'stellar-sdk';

import {
  withStyles,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import multiSigValidator from '../../../shared/validators/multiSig';
import {
  FormError,
  FormFieldHelperText,
  CopyToClipboard
} from '../../components';

const styles = theme => ({
  divider: {
    margin: '16px 0'
  },
  addBackupSigner: {
    marginLeft: theme.spacing.unit
  },
  signersHeader: {
    display: 'flex',
    alignItems: 'center'
  }
});

@inject('rootStore')
@observer
@withFormik({
  mapPropsToValues(props) {
    return {
      sourceAccount: '',
      primarySigner: props.rootStore.currentUser.signerPublicKey,
      addBackupSigner: false,
      backupSigner: '',
      baseFee: StellarSdk.BASE_FEE
    };
  },
  async handleSubmit(values, { props, setSubmitting, setErrors }) {
    try {
      await props.rootStore.uiState.addStellarUiState.buildMultiSigTransaction(
        values
      );
      props.onSubmit();
    } catch (error) {
      setErrors(error.toFormError());
    } finally {
      setSubmitting(false);
    }
  },
  validationSchema: multiSigValidator.schema
})
@withStyles(styles)
class BuildMultiSigForm extends Component {
  onSubmit = event => {
    this.props.handleSubmit(event);
    this.props.onSubmit(this.props.values);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isValid !== this.props.isValid) {
      this.props.onIsValidChange(nextProps.isValid);
    }
  }

  render() {
    const {
      classes,
      values,
      errors,
      touched,
      handleChange,
      handleBlur
    } = this.props;

    return (
      <Form id="build-multisig-form" noValidate>
        <Typography variant="h6">Build Multisig Transaction</Typography>
        <FormError touched={touched} errors={errors} />
        <TextField
          fullWidth
          required
          margin="normal"
          type="text"
          id="sourceAccount"
          name="sourceAccount"
          placeholder="Example: GCPG4BXCMCD4JSH5EC3SD2HMIGTLNXUZKOUSLP7MEY63HICHNNHI6KO7"
          label="Your Public Key"
          onChange={handleChange}
          inputProps={{ onBlur: handleBlur }}
          value={values.sourceAccount}
          error={!!(touched.sourceAccount && errors.sourceAccount)}
          helperText={
            <FormFieldHelperText
              error={errors.sourceAccount}
              touched={touched.sourceAccount}
            >
              This is the account you want protected with StellarGuard
            </FormFieldHelperText>
          }
        />
        <TextField
          fullWidth
          required
          margin="normal"
          type="text"
          id="baseFee"
          name="baseFee"
          label="Your Base Fee"
          onChange={handleChange}
          inputProps={{ onBlur: handleBlur }}
          value={values.baseFee}
          error={!!(touched.baseFee && errors.baseFee)}
          helperText={
            <FormFieldHelperText
              error={errors.baseFee}
              touched={touched.baseFee}
            >
              This is the account you want protected with StellarGuard
            </FormFieldHelperText>
          }
        />

        <div className={classes.signersHeader}>
          <Typography variant="h6">Signers </Typography>
          <FormControlLabel
            className={classes.addBackupSigner}
            control={
              <Checkbox
                id="addBackupSigner"
                name="addBackupSigner"
                checked={values.addBackupSigner}
                onChange={handleChange}
              />
            }
            label="Add a Backup Signer"
          />
          <Typography
            variant="caption"
            component="a"
            href="/faq#backup-signer"
            target="_blank"
          >
            What&apos;s this?
          </Typography>
        </div>
        <CopyToClipboard text={values.primarySigner}>
          <TextField
            fullWidth
            margin="normal"
            type="text"
            id="primarySigner"
            name="primarySigner"
            label="StellarGuard Public Key"
            onChange={handleChange}
            value={values.primarySigner}
            inputProps={{ readOnly: true }}
          />
        </CopyToClipboard>
        {values.addBackupSigner && (
          <TextField
            fullWidth
            autoFocus
            margin="normal"
            type="text"
            id="backupSigner"
            name="backupSigner"
            label="Backup Signer Public Key"
            onChange={handleChange}
            inputProps={{ onBlur: handleBlur }}
            placeholder="Example: GCPG4BXCMCD4JSH5EC3SD2HMIGTLNXUZKOUSLP7MEY63HICHNNHI6KO7"
            error={!!(touched.backupSigner && errors.backupSigner)}
          />
        )}
      </Form>
    );
  }
}

export default BuildMultiSigForm;
