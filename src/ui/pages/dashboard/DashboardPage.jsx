import React, { Component } from 'react';
import { withStyles, Grid } from 'material-ui';
import { Page, SubmitTransactionFab } from '../../components';

import VerifyEmailCard from './VerifyEmailCard';
import AddFirstStellarAccountCard from './AddFirstStellarAccountCard';
import AddTwoFactorAuthCard from './tfa/AddTwoFactorAuthCard';
import StellarAccountsCard from './StellarAccountsCard';

import { inject, observer } from 'mobx-react';

const styles = theme => ({});

@withStyles(styles)
@inject('rootStore')
@observer
class DashboardPage extends Component {
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
    if (
      this.props.rootStore.currentUser.accounts &&
      this.props.rootStore.currentUser.accounts.length
    ) {
      return (
        <Grid item xs={12}>
          <StellarAccountsCard />
        </Grid>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Grid container justify="space-around">
          {this.verifyEmailCard()}
          {this.addTwoFactorAuthCard()}
          {this.stellarAccountsCard()}
          {this.addFirstStellarAccountCard()}
        </Grid>
        <SubmitTransactionFab />
      </Page>
    );
  }
}

export default DashboardPage;
