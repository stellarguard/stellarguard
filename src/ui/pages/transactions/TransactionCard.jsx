import React, { Component } from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardActions,
  Typography,
  Button
} from 'material-ui';
import { observer, inject } from 'mobx-react';

import { Operations } from './operations';
import AuthorizeTransactionDialog from './AuthorizeTransactionDialog';

const styles = theme => ({
  denyButton: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.contrastText
  }
});

@inject('rootStore')
@observer
@withStyles(styles)
class TransactionCard extends Component {
  state = {
    authorizeDialogOpen: false
  };

  render() {
    const { classes, transaction, code = '' } = this.props;
    const { authorizeDialogOpen } = this.state;
    return (
      <React.Fragment>
        <AuthorizeTransactionDialog
          code={code}
          transaction={transaction}
          open={authorizeDialogOpen}
          onClose={this.handleAuthorizationDialogClose}
        />
        <Card>
          <CardContent>
            <Operations operations={transaction.operations} />
          </CardContent>
          <CardActions>
            <Button
              className={classes.denyButton}
              color="inherit"
              onClick={this.onDenyTransactionClick}
            >
              Deny
            </Button>
            <Button color="primary" onClick={this.onAuthorizeTransactionClick}>
              Authorize
            </Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }

  onDenyTransactionClick = async () => {
    this.props.rootStore.transactionsStore.denyTransaction(
      this.props.transaction
    );
  };

  onAuthorizeTransactionClick = () => {
    this.setState({ authorizeDialogOpen: true });
  };

  handleAuthorizationDialogClose = () => {
    this.setState({ authorizeDialogOpen: false });
  };
}

export default TransactionCard;
