import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import NoneAuthorizeDialog from './NoneAuthorizeDialog';
import EmailAuthorizeDialog from './EmailAuthorizeDialog';
import AuthenticatorAuthorizeDialog from './AuthenticatorAuthorizeDialog';

const dialogTypes = new Map();
dialogTypes.set('none', NoneAuthorizeDialog);
dialogTypes.set('email', EmailAuthorizeDialog);
dialogTypes.set('authenticator', AuthenticatorAuthorizeDialog);

const styles = theme => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class AuthorizeTransactionDialog extends Component {
  onSuccess = () => {
    this.props.onClose(this.props.transaction);
  };

  onCancel = () => {
    this.props.onClose();
  };

  render() {
    const {
      open,
      transaction,
      type = this.props.rootStore.currentUser.transactionSecurityLevel,
      code
    } = this.props;

    const AuthorizeDialog = dialogTypes.get(type);
    return (
      <AuthorizeDialog
        open={open}
        code={code}
        transaction={transaction}
        onSuccess={this.onSuccess}
        onCancel={this.onCancel}
      />
    );
  }
}

export default AuthorizeTransactionDialog;
