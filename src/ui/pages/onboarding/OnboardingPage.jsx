import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';

import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import { Page } from '../../components';

import OnboardingSteps from './OnboardingSteps';

@observer
class OnboardingPage extends Component {
  render() {
    const { currentStep, children } = this.props;

    return (
      <Page>
        <Helmet>
          <title>StellarGuard | Setup</title>
        </Helmet>
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item xs={12}>
            <OnboardingSteps currentStep={currentStep} />
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Page>
    );
  }
}

export default OnboardingPage;
