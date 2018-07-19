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

const styles = theme => ({
  avatar: {}
});

@withStyles(styles)
@inject('rootStore')
@observer
class OnboardingRecoveryPhrasePage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <OnboardingPage currentStep={3}>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <SecurityIcon />
              </Avatar>
            }
            title="Recovery Phrase"
          />
          <CardContent>
            <Typography paragraph>Recovery Phrase</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.next}>Next</Button>
          </CardActions>
        </Card>
      </OnboardingPage>
    );
  }

  next = () => {
    this.props.rootStore.onboardingStore.completeRecoveryPhrase();
  };
}

export default OnboardingRecoveryPhrasePage;
