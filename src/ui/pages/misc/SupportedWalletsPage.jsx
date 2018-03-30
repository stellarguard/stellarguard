import React, { Component } from 'react';
import { withStyles, Grid, Typography } from 'material-ui';
import { Helmet } from 'react-helmet';

import { observer } from 'mobx-react';
import { withRouter } from 'react-router';

import { Page, DashboardFab } from '../../components';

import { MyStellarToolsCard, StellarLaboratoryCard } from './Wallets';

const styles = theme => ({
  partialSupport: {
    marginTop: theme.spacing.unit * 2
  }
});

@withStyles(styles)
@withRouter
@observer
class SubmitTransactionPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Page>
        <Helmet>
          <title>StellarGuard | Supported Wallets</title>
        </Helmet>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              Fully Supported Wallets
            </Typography>
            <Typography variant="subheading" gutterBottom>
              These wallets have direct integration with StellarGuard.
            </Typography>
            <Typography variant="subheading">
              Instead of copying your transaction to StellarGuard you can use
              the wallet like normal and transactions will be submited to
              StellarGuard.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyStellarToolsCard />
          </Grid>
          <Grid item xs={12} className={classes.partialSupport}>
            <Typography variant="title" gutterBottom>
              Partially Supported Wallets
            </Typography>
            <Typography variant="subheading" gutterBottom>
              These wallets allow you to copy the signed transaction XDR so you
              can submit it yourself to StellarGuard.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StellarLaboratoryCard />
          </Grid>
        </Grid>
        <DashboardFab />
      </Page>
    );
  }
}

export default SubmitTransactionPage;
