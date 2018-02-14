import React, { Component } from 'react';
import { withStyles, Grid, Paper, Card, CardContent } from 'material-ui';
import { Helmet } from 'react-helmet';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

import { Page } from '../../components';
import TransactionCard from './TransactionCard';

const styles = theme => {
  return {};
};

@inject('rootStore')
@observer
@withRouter
@withStyles(styles)
class SubmitTransactionPage extends Component {
  state = {};

  async componentDidMount() {
    const id = this.props.match.params.id;
    const transaction = await this.props.rootStore.transactionsStore.getTransaction(
      id
    );

    this.setState({ transaction });
  }

  render() {
    const { classes, children } = this.props;
    const { transaction } = this.state;
    const loading = !transaction;

    return (
      <Page title="Authorize Transaction" loading={loading}>
        <Helmet>
          <title>StellarGuard | Authorize Transaction</title>
        </Helmet>
        {!loading && (
          <Grid container spacing={24} justify="space-around">
            <Grid item xs={12} sm={9}>
              <TransactionCard transaction={transaction} />
            </Grid>
          </Grid>
        )}
      </Page>
    );
  }
}

export default SubmitTransactionPage;
