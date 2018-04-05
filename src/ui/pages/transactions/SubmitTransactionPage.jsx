import React, { Component } from 'react';
import { withStyles, Grid, Paper, Card, CardContent } from 'material-ui';
import { Helmet } from 'react-helmet';

import { Page, DashboardFab } from '../../components';
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
        <Grid container justify="space-around" spacing={16}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {transaction ? (
                  <SubmitTransactionSuccess transaction={transaction} />
                ) : (
                  <SubmitTransactionForm onSuccess={this.handleSubmitSuccess} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

export default SubmitTransactionPage;
