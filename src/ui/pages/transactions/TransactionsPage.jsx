import React, { Component } from 'react';
import { withStyles, Grid, Typography } from 'material-ui';
import { Helmet } from 'react-helmet';

import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Page, DashboardFab } from '../../components';
import TransactionCard from './TransactionCard';

const styles = theme => {
  return {};
};

@withStyles(styles)
@withRouter
@inject('rootStore')
@observer
class TransactionsPage extends Component {
  @computed
  get transactions() {
    return this.props.rootStore.transactionsStore.pendingTransactions;
  }

  async componentDidMount() {
    const search = new URLSearchParams(this.props.location.search);
    const status = search.get('status');
    await this.props.rootStore.transactionsStore.getTransactions();
  }

  render() {
    const { classes } = this.props;
    const transactions = this.transactions;
    const loading = !transactions;

    return (
      <Page title="Pending Transactions" loading={loading}>
        <Helmet>
          <title>StellarGuard | Pending Transactions</title>
        </Helmet>
        <DashboardFab />
        {!loading && (
          <Grid container>
            {transactions.length ? (
              transactions.map(transaction => (
                <Grid key={transaction.id} item xs={12}>
                  <TransactionCard transaction={transaction} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="display1" gutterBottom>
                  You&apos;re all set!
                </Typography>
                <Typography variant="display1" gutterBottom>
                  You have no more pending transactions.
                </Typography>
                <Typography
                  color="primary"
                  variant="display1"
                  component={Link}
                  to="/"
                >
                  Go Back Home
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Page>
    );
  }
}

export default TransactionsPage;
