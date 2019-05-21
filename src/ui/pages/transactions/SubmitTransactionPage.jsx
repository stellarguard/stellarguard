import React, { Component } from 'react';
import {
  withStyles,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { Page, DashboardFab, Link } from '../../components';
import SubmitTransactionForm from './SubmitTransactionForm';
import SubmitTransactionSuccess from './SubmitTransactionSuccess';

const styles = theme => {
  return {};
};

@withStyles(styles)
class SubmitTransactionPage extends Component {
  state = {};

  handleSubmitSuccess = transaction => {
    this.setState({ transaction });
  };

  render() {
    const { classes } = this.props;
    const { transaction } = this.state;

    return (
      <Page title="New Transaction">
        <Helmet>
          <title>StellarGuard | New Transaction</title>
        </Helmet>
        <DashboardFab />
        <Typography variant="subtitle1" gutterBottom>
          For instructions about how to get the transaction XDR from the Stellar
          Account Viewer payments{' '}
          <Link to="/help/new-transaction-account-viewer">click here.</Link>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          For intructions about more advanced operations{' '}
          <Link to="/help/new-transaction-stellar-labs">click here.</Link>
        </Typography>
        <Card>
          <CardContent>
            {transaction ? (
              <SubmitTransactionSuccess transaction={transaction} />
            ) : (
              <SubmitTransactionForm onSuccess={this.handleSubmitSuccess} />
            )}
          </CardContent>
        </Card>
      </Page>
    );
  }
}

export default SubmitTransactionPage;
