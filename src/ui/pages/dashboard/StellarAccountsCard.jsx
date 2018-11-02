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
  Tooltip,
  Hidden
} from '@material-ui/core';
import {
  Security as SecurityIcon,
  Lock as LockIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import { inject, observer } from 'mobx-react';

import green from '@material-ui/core/colors/green';

import DeactivateAccountDialog from '../accounts/DeactivateAccountDialog';
import EditAccountDialog from '../accounts/EditAccountDialog';

const styles = theme => ({
  avatar: {
    backgroundColor: green[500]
  },
  publicKey: {
    overflowWrap: 'break-word'
  },
  listItem: {
    paddingRight: theme.spacing.unit * 12
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class StellarAccountsCard extends Component {
  state = { accountToDeactivate: null, accountToEdit: null };

  render() {
    const { classes, rootStore } = this.props;
    const { accountToDeactivate, accountToEdit } = this.state;

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
                <ListItem className={classes.listItem} key={account.id}>
                  <Hidden smDown>
                    <ListItemAvatar>
                      <Avatar>
                        <LockIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </Hidden>
                  <ListItemText
                    primary={
                      <span className={classes.publicKey}>
                        {account.name || account.publicKey}
                      </span>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="Edit"
                        onClick={() => this.editStellarAccount(account)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
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
        <EditAccountDialog
          open={!!accountToEdit}
          onClose={this.onEditDialogClose}
          account={accountToEdit}
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

  editStellarAccount = account => {
    this.setState({ accountToEdit: account });
  };

  onEditDialogClose = () => {
    this.setState({ accountToEdit: null });
  };
}

export default StellarAccountsCard;
