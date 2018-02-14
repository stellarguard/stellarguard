import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';
import { observer } from 'mobx-react';

import OperationWrapper from './OperationWrapper';

const styles = theme => ({});

@observer
@withStyles(styles)
class PaymentOperation extends Component {
  render() {
    const { classes, children, operation } = this.props;
    return (
      <OperationWrapper type="Payment">
        <Typography>To: {operation.destination}</Typography>
        <Typography>
          Amount: {operation.amount} {operation.asset.code}
        </Typography>
      </OperationWrapper>
    );
  }
}

export default PaymentOperation;
