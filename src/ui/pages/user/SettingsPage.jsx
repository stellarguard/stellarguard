import React, { Component } from 'react';
import { withStyles, Grid, Typography, Card, CardContent } from 'material-ui';
import { Helmet } from 'react-helmet';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';

import { Page, DashboardFab, Field, CopyToClipboard } from '../../components';

const styles = theme => ({
  subheading: {
    marginBottom: theme.spacing.unit * 2
  },
  copyExternalId: {
    cursor: 'pointer',
    color: theme.palette.primary.main
  }
});

@withStyles(styles)
@withRouter
@inject('rootStore')
@observer
class SettingsPage extends Component {
  render() {
    const { classes, rootStore } = this.props;
    const { email, externalId } = rootStore.currentUser;

    return (
      <Page title="Settings">
        <Helmet>
          <title>StellarGuard | Settings</title>
        </Helmet>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography className={classes.subheading} variant="subheading">
                  User Info
                </Typography>
                <Field label="Email:">{email}</Field>
                <Field label="External Id:">
                  <CopyToClipboard text={externalId}>
                    <span>
                      {externalId} -{' '}
                      <span className={classes.copyExternalId}>Copy</span>
                    </span>
                  </CopyToClipboard>
                </Field>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <DashboardFab />
      </Page>
    );
  }
}

export default SettingsPage;
