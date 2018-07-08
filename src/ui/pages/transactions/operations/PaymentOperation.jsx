import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import OperationWrapper from './OperationWrapper';

import { PublicKey } from '../../../components';

const styles = theme => ({
  label: {
    fontWeight: 500,
    marginRight: theme.spacing.unit,
    minWidth: '60px',
    textAlign: 'right',
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      textAlign: 'left'
    }
  },
  field: {},
  content: {
    display: 'inline',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  }
});

@observer
@withStyles(styles)
class Field extends Component {
  render() {
    const { classes, label, children } = this.props;
    return (
      <Typography component="div" className={classes.field} gutterBottom>
        <label className={classes.label}>{label}</label>
        <div className={classes.content}>{children}</div>
      </Typography>
    );
  }
}

@observer
@withStyles(styles)
class PaymentOperation extends Component {
  render() {
    const { operation } = this.props;
    return (
      <OperationWrapper type="Payment">
        <Field label="To:">
          <PublicKey>{operation.destination}</PublicKey>
        </Field>
        <Field label="Amount:">
          {operation.amount} {operation.asset.code}
        </Field>
      </OperationWrapper>
    );
  }
}

export default PaymentOperation;
