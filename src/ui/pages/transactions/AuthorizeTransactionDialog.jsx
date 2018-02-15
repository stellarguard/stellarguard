import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { observer } from 'mobx-react';

import EmailAuthorizeDialog from './EmailAuthorizeDialog';

const dialogTypes = new Map();
dialogTypes.set('email', EmailAuthorizeDialog);

const styles = theme => ({});

@observer
@withStyles(styles)
class AuthorizeTransactionDialog extends Component {
  onSuccess = () => {
    this.props.onClose({});
  };

  onCancel = () => {
    this.props.onClose();
  };

  render() {
    const { classes, open, transaction, type } = this.props;
    const AuthorizeDialog = dialogTypes.get(type);
    return (
      <AuthorizeDialog
        open={open}
        transaction={transaction}
        onSuccess={this.onSuccess}
        onCancel={this.onCancel}
      />
    );
  }
}

export default AuthorizeTransactionDialog;
