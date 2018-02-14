import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';
import { observer } from 'mobx-react';

import OperationWrapper from './OperationWrapper';

const styles = theme => ({});

@observer
@withStyles(styles)
class UnknownOperation extends Component {
  render() {
    const { classes, children, operation } = this.props;
    return (
      <OperationWrapper type="Other">
        <pre>{JSON.stringify(operation, null, 2)}</pre>
      </OperationWrapper>
    );
  }
}

export default UnknownOperation;
