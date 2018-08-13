import React, { Component } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@material-ui/core';

import { observer, inject } from 'mobx-react';

import { LogoAvatar } from '../../components';

const OptionalLabel = () => {
  return (
    <Typography align="center" variant="caption">
      Optional
    </Typography>
  );
};

@inject('rootStore')
@observer
class OnboardingSteps extends Component {
  render() {
    const { currentStep, rootStore } = this.props;
    return (
      <Card>
        <CardHeader
          avatar={<LogoAvatar />}
          title="Welcome to StellarGuard"
          subheader="Let's take a moment to set up your account and keep it secure."
        />
        <CardContent>
          <Stepper activeStep={currentStep} alternativeLabel>
            <Step
              completed={rootStore.onboardingStore.isVerifyEmailStepComplete}
            >
              <StepLabel>Verify Email</StepLabel>
            </Step>
            <Step
              completed={
                rootStore.onboardingStore.isAddAuthenticatorStepComplete
              }
            >
              <StepLabel optional={<OptionalLabel />}>
                Two Factor Auth
              </StepLabel>
            </Step>
            <Step
              completed={
                rootStore.onboardingStore.isTransactionSecurityStepComplete
              }
            >
              <StepLabel>Transaction Security</StepLabel>
            </Step>
            <Step
              completed={rootStore.onboardingStore.isRecoveryPhraseComplete}
            >
              <StepLabel optional={<OptionalLabel />}>
                Recovery Phrase
              </StepLabel>
            </Step>
          </Stepper>
        </CardContent>
      </Card>
    );
  }
}

export default OnboardingSteps;
