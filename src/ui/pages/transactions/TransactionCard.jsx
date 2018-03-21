import React, { Component } from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Avatar,
  CardActions,
  Typography,
  Button
} from 'material-ui';
import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';

import { Operations } from './operations';
import AuthorizeTransactionDialog from './AuthorizeTransactionDialog';
import { LoadingButton } from '../../components';

const styles = theme => ({
  denyButton: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.contrastText
    }
  },
  pending: {
    backgroundColor: grey[500]
  },
  success: {
    backgroundColor: green[500]
  },
  denied: {
    backgroundColor: theme.palette.error.main
  },
  expired: {
    backgroundColor: theme.palette.error.main
  },
  error: {
    backgroundColor: theme.palette.error.main
  }
});

@withStyles(styles)
@observer
class TransactionStatus extends Component {
  get statusText() {
    const transaction = this.props.transaction;
    if (transaction.isPending) {
      return 'Awaiting Authorization';
    }

    if (transaction.isSuccessful) {
      return 'Submitted to Stellar Network';
    }

    if (transaction.isDenied) {
      return 'Denied by User';
    }

    if (transaction.isDenied) {
      return 'Expired';
    }

    if (transaction.isError) {
      return 'Error while submitting to Stellar Network';
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <span>
        Status: <span className={cx(classes.status)}>{this.statusText}</span>
      </span>
    );
  }
}

@withStyles(styles)
@observer
class TransactionHeaderAvatar extends Component {
  render() {
    const { classes, transaction } = this.props;
    const statusClasses = {
      [classes.pending]: transaction.isPending,
      [classes.success]: transaction.isSuccessful,
      [classes.denied]: transaction.isDenied,
      [classes.expired]: transaction.isExpired,
      [classes.error]: transaction.isError
    };
    return (
      <Avatar className={cx(classes.avatar, statusClasses)}>
        {transaction.id}
      </Avatar>
    );
  }
}

@withStyles(styles)
@inject('rootStore')
@observer
class TransactionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      isDenyLoading: false,
      authorizeDialogOpen: !!props.code || false
    };
  }

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
          <CardHeader
            avatar={<TransactionHeaderAvatar transaction={transaction} />}
            title={<TransactionStatus transaction={transaction} />}
            subheader={
              <div>
                <div>Source: {transaction.source}</div>
                {transaction.memoText && (
                  <div>Memo: {transaction.memoText}</div>
                )}
              </div>
            }
          />
          <CardContent>
            <Typography />
            <Operations operations={transaction.operations} />
          </CardContent>
          {transaction.isPending && (
            <CardActions>
              <LoadingButton
                loading={this.state.isDenyLoading}
                className={classes.denyButton}
                color="inherit"
                onClick={this.onDenyTransactionClick}
              >
                Deny
              </LoadingButton>
              <Button
                color="primary"
                onClick={this.onAuthorizeTransactionClick}
              >
                Authorize
              </Button>
            </CardActions>
          )}
          {transaction.isSuccessful ||
            (transaction.isError && (
              <React.Fragment>
                <CardActions>
                  <Button color="primary" onClick={this.toggleShowResult}>
                    Show Result
                  </Button>
                </CardActions>
                <Collapse
                  in={this.state.showResult}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <Typography variant="title">Stellar Result</Typography>
                    <pre
                      style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
                    >
                      <code>{transaction.resultJson}</code>
                    </pre>
                  </CardContent>
                </Collapse>
              </React.Fragment>
            ))}
        </Card>
      </React.Fragment>
    );
  }

  onDenyTransactionClick = async () => {
    try {
      this.setState({ isDenyLoading: true });
      await this.props.rootStore.transactionsStore.deny(this.props.transaction);
    } catch (e) {
      // TODO - show error
    } finally {
      this.setState({ isDenyLoading: false });
    }
  };

  onAuthorizeTransactionClick = () => {
    this.setState({ authorizeDialogOpen: true });
  };

  handleAuthorizationDialogClose = () => {
    this.setState({ authorizeDialogOpen: false });
  };

  toggleShowResult = () => {
    this.setState({ showResult: !this.state.showResult });
  };
}

export default TransactionCard;
