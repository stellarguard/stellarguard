import React, { Component } from 'react';
import { withStyles, Grid } from 'material-ui';
import { Page, SubmitTransactionFab } from '../../components';

import VerifyEmailCard from './VerifyEmailCard';
import AddFirstStellarAccountCard from './AddFirstStellarAccountCard';
import AddTwoFactorAuthCard from './tfa/AddTwoFactorAuthCard';
import StellarAccountsCard from './StellarAccountsCard';
import SummaryCard from './SummaryCard';

import { inject, observer } from 'mobx-react';

const styles = theme => ({
  sideColumn: {
    [theme.breakpoints.down('sm')]: {
      order: 0
    }
  },
  contentColumn: {
    [theme.breakpoints.down('sm')]: {
      order: 1
    }
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class DashboardPage extends Component {
  summaryCard() {
    return (
      <Grid item xs={12}>
        <SummaryCard />
      </Grid>
    );
  }

  verifyEmailCard() {
    if (this.props.rootStore.sessionStore.currentUser.isEmailVerified) {
      return null;
    }

    return (
      <Grid item xs={12}>
        <VerifyEmailCard />
      </Grid>
    );
  }

  addFirstStellarAccountCard() {
    return (
      <Grid item xs={12}>
        <AddFirstStellarAccountCard />
      </Grid>
    );
  }

  addTwoFactorAuthCard() {
    if (this.props.rootStore.currentUser.hasAuthenticator) {
      return null;
    }

    return (
      <Grid item xs={12}>
        <AddTwoFactorAuthCard />
      </Grid>
    );
  }

  stellarAccountsCard() {
    if (this.props.rootStore.currentUser.hasAccounts) {
      return (
        <Grid item xs={12}>
          <StellarAccountsCard />
        </Grid>
      );
    }
  }

  render() {
    const { classes, rootStore } = this.props;
    const hasSideColumn = rootStore.currentUser.pendingTransactions.length > 0;
    return (
      <Page>
        <Grid container spacing={16}>
          <Grid
            container
            spacing={16}
            item
            xs={12}
            sm={12}
            md={hasSideColumn ? 9 : 12}
            className={classes.contentColumn}
          >
            {this.verifyEmailCard()}
            {this.addTwoFactorAuthCard()}
            {this.stellarAccountsCard()}
            {this.addFirstStellarAccountCard()}
          </Grid>
          {hasSideColumn ? (
            <Grid
              container
              spacing={16}
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideColumn}
            >
              {this.summaryCard()}
            </Grid>
          ) : null}
        </Grid>
        <SubmitTransactionFab />
      </Page>
    );
  }
}

export default DashboardPage;
