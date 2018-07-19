import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar
} from '@material-ui/core';
import { Security as SecurityIcon } from '@material-ui/icons';

import { inject, observer } from 'mobx-react';

import OnboardingPage from './OnboardingPage';
import { TransactionSecurityLevelForm } from '../../components';

const styles = theme => ({
  nextButton: {
    marginLeft: 'auto'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class OnboardingTransactionSecurityPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <OnboardingPage currentStep={2}>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <SecurityIcon />
              </Avatar>
            }
            title="Transaction Security Level"
            subheader="Choose what level of security you want to require per transaction. You may change this later in the Settings menu."
          />
          <CardContent>
            <TransactionSecurityLevelForm />
          </CardContent>
          <CardActions>
            <Button onClick={this.back}>Back</Button>
            <Button className={classes.nextButton} onClick={this.next}>
              Next
            </Button>
          </CardActions>
        </Card>
      </OnboardingPage>
    );
  }

  back = () => {
    this.props.rootStore.onboardingStore.gotoAddAuthenticatorStep();
  };

  next = () => {
    this.props.rootStore.onboardingStore.completeTransactionSecurityStep();
  };
}

export default OnboardingTransactionSecurityPage;
