import React, { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { withRouter } from 'react-router';

import { Page, DashboardFab } from '../../components';
import TransactionCard from './TransactionCard';

const styles = theme => {
  return {};
};

@withStyles(styles)
@withRouter
@inject('rootStore')
@observer
class SubmitTransactionPage extends Component {
  @computed
  get transaction() {
    const id = this.props.match.params.id;
    return this.props.rootStore.transactionsStore.transactions.get(id);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.rootStore.transactionsStore.getTransaction(id);
  }

  render() {
    const { classes } = this.props;
    const transaction = this.transaction;
    const loading = !transaction;

    const search = new URLSearchParams(this.props.location.search);
    const code = search.get('code');

    return (
      <Page title="Authorize Transaction" loading={loading}>
        <Helmet>
          <title>StellarGuard | Authorize Transaction</title>
        </Helmet>
        <DashboardFab />
        {!loading && (
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12}>
              <TransactionCard code={code} transaction={transaction} />
            </Grid>
          </Grid>
        )}
      </Page>
    );
  }
}

export default SubmitTransactionPage;
