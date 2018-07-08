import React from 'react';
import { withStyles, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import { FormFieldHelperText } from '../../components';

const styles = () => ({});

@withStyles(styles)
@observer
class AuthenticatorSignInForm extends React.Component {
  render() {
    const { values, touched, errors, handleChange, handleBlur } = this.props;

    return (
      <div>
        <Typography variant="body1">Enter Authenticator Code</Typography>
        <TextField
          fullWidth
          autoFocus
          required
          margin="normal"
          type="text"
          id="code"
          name="code"
          label="Authenticator Code"
          onChange={handleChange}
          inputProps={{ onBlur: handleBlur, maxLength: 6 }}
          value={values.code}
          error={!!(touched.code && errors.code)}
          helperText={
            <FormFieldHelperText error={errors.code} touched={touched.code}>
              Enter the 6-digit code from your authenticator app
            </FormFieldHelperText>
          }
        />
      </div>
    );
  }
}

export default AuthenticatorSignInForm;
