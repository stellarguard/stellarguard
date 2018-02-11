import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import {
  withStyles,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider
} from 'material-ui';
import { Help as HelpIcon } from 'material-ui-icons';
import { inject, observer } from 'mobx-react';
import yup from 'yup';

import FormHelp from '../../components/FormHelp';

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
class BuildMultiSigForm extends Component {
  onSubmit = values => {
    this.props.onSubmit(values);
  };

  render() {
    const { classes, rootStore } = this.props;

    return (
      <Formik
        initialValues={{
          sourceAccount: '',
          stellarGuardSigner:
            'GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD', // TODO - don't hardcode
          addBackupSigner: false,
          backupSigner: '',
          memo: ''
        }}
        onSubmit={this.onSubmit}
        render={({ values, errors, touched, handleChange, handleBlur }) => (
          <Form id="build-multisig-form">
            <Typography variant="title">Build Multisig Transaction</Typography>
            <TextField
              fullWidth
              required
              margin="normal"
              type="text"
              id="sourceAccount"
              name="sourceAccount"
              placeholder="Example: GCPG4BXCMCD4JSH5EC3SD2HMIGTLNXUZKOUSLP7MEY63HICHNNHI6KO7"
              label="Your Stellar Public Key"
              onChange={handleChange}
              inputProps={{ onBlur: handleBlur }}
              value={values.sourceAccount}
              error={!!(touched.sourceAccount && errors.sourceAccount)}
            />
            <TextField
              required
              disabled
              margin="normal"
              type="text"
              id="memo"
              name="memo"
              label="Memo Text"
              onChange={handleChange}
              value={rootStore.currentUser.memoText}
              error={!!(touched.sourceAccount && errors.sourceAccount)}
            />
            <Divider className={classes.divider} />
            <div className={classes.signersHeader}>
              <Typography variant="title">Signers </Typography>
              <FormControlLabel
                className={classes.addBackupSigner}
                control={
                  <div>
                    <Checkbox
                      id="addBackupSigner"
                      name="addBackupSigner"
                      checked={values.addBackupSigner}
                      onChange={handleChange}
                    />
                  </div>
                }
                label="Add a Backup Signer"
              />
            </div>
            <TextField
              fullWidth
              margin="normal"
              type="text"
              id="stellarGuardSigner"
              name="sourceAccount"
              label="StellarGuard's Public Key"
              onChange={handleChange}
              value={values.stellarGuardSigner}
              disabled
            />
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
                placeholder="Example: GCPG4BXCMCD4JSH5EC3SD2HMIGTLNXUZKOUSLP7MEY63HICHNNHI6KO7"
              />
            )}
          </Form>
        )}
      />
    );
  }
}

export default withStyles(styles)(BuildMultiSigForm);
