import React, { Component } from 'react';
import { withStyles, Avatar, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';

import { Link } from '../../components';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  success: {
    height: theme.spacing.unit * 12,
    width: theme.spacing.unit * 12,
    color: '#FFF',
    marginBottom: theme.spacing.unit,
    backgroundColor: green[500]
  },
  successIcon: {
    height: '50%',
    width: '50%'
  }
});

@withStyles(styles)
class SubmitTransactionSuccess extends Component {
  render() {
    const { classes, transaction } = this.props;
    return (
      <div className={classes.root}>
        <Avatar className={classes.success}>
          <CheckCircle className={classes.successIcon} />
        </Avatar>
        <Typography variant="h5" className={classes.root}>
          <div>Your transaction has been submitted to StellarGuard.</div>
          <div>
            <Link to={`/transactions/${transaction.id}`}>
              Go here to authorize your transaction.
            </Link>
          </div>
        </Typography>
      </div>
    );
  }
}

export default SubmitTransactionSuccess;
