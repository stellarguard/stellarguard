import React, { Component, Fragment } from 'react';
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
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import {
  MoreHoriz as PendingIcon,
  Done as SuccessIcon,
  Cancel as DenyIcon,
  ErrorOutline as ErrorIcon
} from '@material-ui/icons';

import { observer, inject } from 'mobx-react';
import cx from 'classnames';

import { Operations } from './operations';
import AuthorizeTransactionDialog from './AuthorizeTransactionDialog';
import { LoadingButton, PublicKey } from '../../components';

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
  },
  publicKey: {
    width: 255,
    minWidth: '100%',
    display: 'block'
  },
  callbackDomain: {
    fontWeight: 500
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
      if (transaction.callback) {
        return `Submitted to ${transaction.callbackDomain}`;
      } else {
        return 'Submitted to Stellar Network';
      }
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
  renderIcon() {
    const { transaction } = this.props;
    if (transaction.isPending) {
      return <PendingIcon />;
    }

    if (transaction.isSuccessful) {
      return <SuccessIcon />;
    }

    if (transaction.isDenied) {
      return <DenyIcon />;
    }

    return <ErrorIcon />;
  }

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
        {this.renderIcon()}
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
              <Fragment>
                <div>
                  Source:{' '}
                  <PublicKey
                    publicKey={transaction.source}
                    linkToStellarExpert
                  />
                </div>
                {transaction.memoText && (
                  <div>Memo: {transaction.memoText}</div>
                )}
                <div>Sequence Number: {transaction.sequenceNumber}</div>
              </Fragment>
            }
          />
          {transaction.callback && (
            <CardContent>
              <Typography variant="subheading" gutterBottom>
                This transaction will be submitted to{' '}
                <span className={classes.callbackDomain}>
                  {transaction.callbackDomain}
                </span>
              </Typography>
            </CardContent>
          )}
          <CardContent>
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
          {transaction.isError && (
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
                Try Again
              </Button>
            </CardActions>
          )}
          {(transaction.isSuccessful || transaction.isError) && (
            <React.Fragment>
              <CardActions>
                <Button color="primary" onClick={this.toggleShowResult}>
                  Show Result
                </Button>
              </CardActions>
              <Collapse in={this.state.showResult} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="title">Results</Typography>
                  <pre
                    style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
                  >
                    <code>{transaction.resultJson}</code>
                  </pre>
                </CardContent>
              </Collapse>
            </React.Fragment>
          )}
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
