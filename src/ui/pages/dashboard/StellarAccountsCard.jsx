import React, { Component, Fragment } from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip
} from 'material-ui';
import {
  Security as SecurityIcon,
  Lock as LockIcon,
  Delete as DeleteIcon
} from 'material-ui-icons';
import { inject, observer } from 'mobx-react';

import green from 'material-ui/colors/green';

import DeactivateAccountDialog from '../accounts/DeactivateAccountDialog';

const styles = theme => ({
  avatar: {
    backgroundColor: green[500]
  },
  publicKey: {
    overflowWrap: 'break-word'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class StellarAccountsCard extends Component {
  state = { accountToDeactivate: null };

  render() {
    const { classes, rootStore } = this.props;
    const { accountToDeactivate } = this.state;

    return (
      <Fragment>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <SecurityIcon />
              </Avatar>
            }
            title="Your Linked Stellar Accounts"
            subheader="These accounts are protected by StellarGuard"
          />
          <CardContent>
            <List>
              {(rootStore.currentUser.accounts || []).map(account => (
                <ListItem key={account.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <LockIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span className={classes.publicKey}>
                        {account.publicKey}
                      </span>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Deactivate StellarGuard">
                      <IconButton
                        aria-label="Deactivate"
                        onClick={() => this.deactivateStellarAccount(account)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <DeactivateAccountDialog
          open={!!accountToDeactivate}
          onClose={this.onDeactivateDialogClose}
          account={accountToDeactivate}
        />
      </Fragment>
    );
  }

  deactivateStellarAccount = account => {
    this.setState({ accountToDeactivate: account });
  };

  onDeactivateDialogClose = () => {
    this.setState({ accountToDeactivate: null });
  };
}

export default StellarAccountsCard;
