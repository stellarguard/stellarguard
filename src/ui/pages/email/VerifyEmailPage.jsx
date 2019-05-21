import React, { Component } from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { Page } from '../../components';

const styles = theme => ({});

@withRouter
@inject('rootStore')
@observer
class VerifyEmailPage extends Component {
  async componentDidMount() {
    const search = new URLSearchParams(this.props.location.search);
    const code = search.get('code');
    if (code) {
      await this.props.rootStore.sessionStore.verifyEmailAddress({ code });
    }
  }

  render() {
    const { classes, rootStore } = this.props;
    if (rootStore.currentUser.isEmailVerified) {
      return <Redirect to="/" />;
    }

    return (
      <Page>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h6">Verifying Email...</Typography>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

export default withStyles(styles)(VerifyEmailPage);
