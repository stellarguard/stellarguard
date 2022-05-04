import React, { Component } from 'react';
import {
  withStyles,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@material-ui/core';
import { observer, inject } from 'mobx-react';

import config from '../../config';
import SubmitTransactionSuccess from '../transactions/SubmitTransactionSuccess';
import SubmitTransactionForm from '../transactions/SubmitTransactionForm';
import { CopyToClipboard, Link, ExternalLink } from '../../components';

const styles = theme => ({
  numbers: {
    backgroundColor: theme.palette.primary.main
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class DeactivateAccount extends Component {
  state = { deactivateAccountXdr: null };

  async componentDidMount() {
    const deactivateAccountXdr = await this.props.rootStore.accountsStore.getDeactivateAccountTransaction(
      this.props.account
    );
    this.setState({ deactivateAccountXdr });
  }

  get stellarTransactionSignerHref() {
    const xdr = this.state.deactivateAccountXdr;
    const network = config.isTestNetwork ? 'test' : 'public';
    return `https://laboratory.stellar.org/#txsigner?xdr=${encodeURIComponent(
      xdr
    )}&network=${network}`;
  }

  render() {
    const { classes } = this.props;
    const { deactivateAccountXdr, transaction } = this.state;
    if (!deactivateAccountXdr) {
      return null;
    }

    if (transaction) {
      return <SubmitTransactionSuccess transaction={transaction} />;
    }

    return (
      <div>
        <List>
          <ListItem>
            <Avatar className={classes.numbers}>1</Avatar>
            <ListItemText
              primary={
                <div>
                  <ExternalLink to={this.stellarTransactionSignerHref}>
                    Sign the transaction to remove the StellarGuard
                    multisignature and copy the XDR so it can be pasted below
                  </ExternalLink>{' '}
                  or{' '}
                  <CopyToClipboard text={deactivateAccountXdr}>
                    <Link>
                      Copy the transaction XDR and sign it in your own wallet
                    </Link>
                  </CopyToClipboard>
                </div>
              }
            />
          </ListItem>
          <ListItem>
            <Avatar className={classes.numbers}>2</Avatar>
            <ListItemText primary="Enter the signed XDR below to submit the transaction to StellarGuard. You will have to authorize the transaction to finalize deactivating your account." />
          </ListItem>
        </List>
        <SubmitTransactionForm
          includeActions={false}
          onSuccess={this.onSubmitSuccess}
        />
      </div>
    );
  }

  onSubmitSuccess = transaction => {
    this.setState({ transaction });
  };
}

export default DeactivateAccount;
