import React, { Component } from 'react';
import {
  withStyles,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import { observer } from 'mobx-react';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3
  },
  radio: {
    marginBottom: theme.spacing.unit
  }
});

const FormControlLabelRadio = withStyles(styles)(
  ({ classes, value, disabled, label, disabledLabel, ...rest }) => {
    return (
      <FormControlLabel
        className={classes.radio}
        value={value}
        control={<Radio />}
        label={
          <div>
            <div>{label}</div>
            {disabled && (
              <div>
                <b>{disabledLabel}</b>
              </div>
            )}
          </div>
        }
        disabled={disabled}
        {...rest}
      />
    );
  }
);

@withStyles(styles)
@observer
export class TransactionSecurityLevelInput extends Component {
  render() {
    const {
      classes,
      value,
      onChange,
      mediumDisabled = false,
      highDisabled = false,
      ...rest
    } = this.props;
    return (
      <RadioGroup
        aria-label="Transaction Security Level"
        value={value}
        onChange={onChange}
        {...rest}
      >
        <FormControlLabelRadio
          value="none"
          label="Low - You must be signed in to approve transactions"
        />
        <FormControlLabelRadio
          value="email"
          label="Medium - Require a passcode sent to your email to approve transactions"
          disabledLabel="You must verify your email to choose this option"
          disabled={mediumDisabled}
        />
        <FormControlLabelRadio
          value="authenticator"
          label="High - Require a two factor auth code to approve transactions"
          disabledLabel="You must set up two factor auth to choose this option"
          disabled={highDisabled}
        />
      </RadioGroup>
    );
  }
}
