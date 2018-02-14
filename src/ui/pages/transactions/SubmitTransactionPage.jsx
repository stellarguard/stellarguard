import React, { Component } from 'react';
import { withStyles, Grid, Paper, Card, CardContent } from 'material-ui';
import { Helmet } from 'react-helmet';

import { Page } from '../../components';
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
    const { classes, children } = this.props;
    const { transaction } = this.state;

    return (
      <Page title="Submit Transaction">
        <Helmet>
          <title>StellarGuard</title>
        </Helmet>
        <Grid container spacing={24} justify="space-around">
          <Grid item xs={12} sm={9}>
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
