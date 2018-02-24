import React, { Component } from 'react';
import { withStyles, Paper } from 'material-ui';
import { observer } from 'mobx-react';

import PaymentOperation from './PaymentOperation';
import UnknownOperation from './UnknownOperation';

const styles = theme => ({
  wrapper: {
    padding: theme.spacing.unit
  }
});

const operationTypes = new Map();
operationTypes.set('payment', PaymentOperation);

@observer
@withStyles(styles)
class Operation extends Component {
  getOperationComponent() {
    return operationTypes.get(this.props.operation.type) || UnknownOperation;
  }

  render() {
    const { classes, operation } = this.props;
    const OperationComponent = this.getOperationComponent();
    return (
      <Paper className={classes.wrapper}>
        <OperationComponent operation={operation} />
      </Paper>
    );
  }
}

export default Operation;
