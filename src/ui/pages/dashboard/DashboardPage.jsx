import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Page from '../../components/Page';
import withAuth from '../../withAuth';

import VerifyEmailCard from './VerifyEmailCard';
import AddFirstStellarAccountCard from './AddFirstStellarAccountCard';

import { inject, observer } from 'mobx-react';

const styles = theme => ({});

@inject('rootStore')
@observer
class DashboardPage extends Component {
  verifyEmailCard() {
    if (this.props.rootStore.sessionStore.currentUser.hasVerifiedEmail) {
      return null;
    }

    return (
      <Grid item sm={12} md={9}>
        <VerifyEmailCard />
      </Grid>
    );
  }

  addFirstStellarAccountCard() {
    return (
      <Grid item sm={12} md={9}>
        <AddFirstStellarAccountCard />
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Grid container spacing={24} justify="space-around">
          {this.verifyEmailCard()}
          {this.addFirstStellarAccountCard()}
        </Grid>
      </Page>
    );
  }
}

export default withStyles(styles)(DashboardPage);
