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
import { observer } from 'mobx-react';

import { Operations } from './operations';
import AuthorizeTransactionDialog from './AuthorizeTransactionDialog';

const styles = theme => ({
  denyButton: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.contrastText
  }
});

@observer
@withStyles(styles)
class TransactionCard extends Component {
  state = {};

  render() {
    const { classes, transaction } = this.props;
    const { authorizeDialogOpen, denyDialogOpen } = this.state;
    return (
      <React.Fragment>
        <AuthorizeTransactionDialog
          transaction={transaction}
          open={authorizeDialogOpen}
          onOk={this.handleAuthorizeDialogOk}
          onCancel={this.handleAuthorizeDialogCancel}
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
    this.rootStore.transactionsStore.denyTransaction(this.props.transaction);
  };

  onAuthorizeTransactionClick = () => {
    this.setState({ authorizeDialogOpen: true });
  };

  handleAuthorizeDialogCancel = () => {
    this.setState({ authorizeDialogOpen: false });
  };

  handleAuthorizeDialogOk = async ({ code } = {}) => {
    this.setState({ authorizeDialogOpen: false });
    this.rootStore.transactionsStore.authorizeTransaction(
      this.props.transaction,
      {
        code
      }
    );
  };
}

export default TransactionCard;
