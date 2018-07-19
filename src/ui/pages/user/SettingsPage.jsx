import React, { Component } from 'react';
import {
  withStyles,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider
} from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';

import { Page, DashboardFab, Field, Action } from '../../components';
import { TransactionSecurityLevelForm } from '../../components/TransactionSecurityLevelForm';

const styles = theme => ({
  subheading: {
    marginBottom: theme.spacing.unit * 2
  },
  label: {
    width: 150
  },
  divider: {
    margin: `${theme.spacing.unit}px 0`
  }
});

@withStyles(styles)
@withRouter
@inject('rootStore')
@observer
class SettingsPage extends Component {
  render() {
    const { classes, rootStore } = this.props;
    const { email } = rootStore.currentUser;

    return (
      <Page title="Settings">
        <Helmet>
          <title>StellarGuard | Settings</title>
        </Helmet>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography className={classes.subheading} variant="subheading">
                  Settings
                </Typography>
                <Field label="Email:" labelClass={classes.label}>
                  {email}
                </Field>
                {this.renderTwoFactorAuthField()}
                <Divider className={classes.divider} />
                <Field label="Transaction Security Level" stacked>
                  <TransactionSecurityLevelForm />
                </Field>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <DashboardFab />
      </Page>
    );
  }

  renderTwoFactorAuthField() {
    let contents;
    if (this.props.rootStore.currentUser.hasAuthenticator) {
      contents = (
        <span>
          Active - <Action onClick={this.removeAuthenticator}>Remove</Action>
        </span>
      );
    } else {
      contents = (
        <span>
          Not Active -{' '}
          <Action onClick={this.enableAuthenticator}>Enable</Action>
        </span>
      );
    }

    return (
      <Field
        labelClass={this.props.classes.label}
        label="2-factor Authentication:"
      >
        {contents}
      </Field>
    );
  }

  enableAuthenticator = () => {
    this.props.rootStore.tfaStore.openAddAuthenticatorDialog();
  };

  removeAuthenticator = () => {
    this.props.rootStore.tfaStore.openRemoveAuthenticatorDialog();
  };
}

export default SettingsPage;
