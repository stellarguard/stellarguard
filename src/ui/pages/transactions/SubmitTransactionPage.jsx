import React, { Component } from 'react';
import {
  withStyles,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography
} from 'material-ui';
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
        <Typography variant="subheading" gutterBottom>
          For instructions about how to build a signed transaction XDR{' '}
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
