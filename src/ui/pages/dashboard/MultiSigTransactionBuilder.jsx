import React, { Component } from 'react';
import { withStyles } from 'material-ui';

const styles = theme => ({});

class MultiSigTransactionBuilder extends Component {
  render() {
    const { classes, children } = this.props;
    return <div>{children}</div>;
  }
}

export default withStyles(styles)(MultiSigTransactionBuilder);
