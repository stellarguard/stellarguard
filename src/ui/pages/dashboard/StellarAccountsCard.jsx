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
  ListItemText
} from 'material-ui';
import { Security as SecurityIcon, Lock as LockIcon } from 'material-ui-icons';
import { inject, observer } from 'mobx-react';

import green from 'material-ui/colors/green';

const styles = theme => ({
  avatar: {
    backgroundColor: green[500]
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class StellarAccountsCard extends Component {
  render() {
    const { classes, rootStore } = this.props;

    return (
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
            {rootStore.currentUser.accounts.map(account => (
              <ListItem key={account.id}>
                <ListItemAvatar>
                  <Avatar>
                    <LockIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={account.publicKey} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default StellarAccountsCard;
