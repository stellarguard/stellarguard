import React, { Component } from 'react';
import { withStyles } from 'material-ui';

const styles = theme => ({});

@withStyles(styles)
class AuthorizeTransactionForm extends Component {
  render() {
    const { classes, children, transaction } = this.props;
    return <div>{children}</div>;
  }
}

export default AuthorizeTransactionForm;
