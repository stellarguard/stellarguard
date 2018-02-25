import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';
import { observer } from 'mobx-react';

import OperationWrapper from './OperationWrapper';

const styles = theme => ({
  label: {
    fontWeight: 500,
    marginRight: theme.spacing.unit,
    minWidth: '60px',
    textAlign: 'right',
    display: 'inline-block'
  }
});

@observer
@withStyles(styles)
class PaymentOperation extends Component {
  render() {
    const { classes, children, operation } = this.props;
    return (
      <OperationWrapper type="Payment">
        <Typography>
          <label className={classes.label}>To: </label>
          {operation.destination}
        </Typography>
        <Typography>
          <label className={classes.label}>Amount: </label> {operation.amount}{' '}
          {operation.asset.code}
        </Typography>
      </OperationWrapper>
    );
  }
}

export default PaymentOperation;
