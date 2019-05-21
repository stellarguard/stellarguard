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
import { RecoveryPhrase } from './RecoveryPhrase';
import { RecoveryPhraseSecretKey } from './RecoveryPhraseSecretKey';

import { LoadingButton } from '../../components';

const styles = theme => ({
  gotIt: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center'
  },
  doneButton: {
    marginLeft: 'auto'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class OnboardingRecoveryPhrasePage extends Component {
  state = {};

  async componentDidMount() {}

  render() {
    const { classes } = this.props;
    const {
      recoveryPhrase,
      secretKey,
      recoveryPhraseLoading = false
    } = this.state;

    const isShowingRecovery = !!(recoveryPhrase || secretKey);
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
            {!isShowingRecovery && (
              <div>
                <Typography variant="subtitle1" paragraph>
                  StellarGuard protects your Stellar account by generating a new
                  secret key for each user and adding it as a required signer
                  for transactions.
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  While you normally will not need to know the secret key to use
                  StellarGuard or remove StellarGuard from your account, you now
                  have the option to view your StellarGuard recovery phrase.
                  This would allow you to remove the StellarGuard signer without
                  going through StellarGuard to do it.
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  If you choose do this, you are responsible for keeping it
                  safe. If an attacker learns both your own account secret key
                  and your StellarGuard secret key, then your Stellar account
                  will be compromised.
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  This is the only time you will be given this option.
                </Typography>
                <div className={classes.gotIt}>
                  <LoadingButton
                    variant="raised"
                    color="primary"
                    loading={recoveryPhraseLoading}
                    onClick={this.showRecoveryPhrase}
                  >
                    I understand the risks, show me the recovery phrase
                  </LoadingButton>
                </div>
              </div>
            )}

            {recoveryPhrase && (
              <RecoveryPhrase recoveryPhrase={recoveryPhrase} />
            )}
            {secretKey && (
              <RecoveryPhraseSecretKey>{secretKey}</RecoveryPhraseSecretKey>
            )}
            {isShowingRecovery && (
              <div className={classes.gotIt}>
                <Button variant="raised" color="primary" onClick={this.next}>
                  Ok, I&apos;ve written it down
                </Button>
              </div>
            )}
          </CardContent>
          <CardActions>
            {!isShowingRecovery && (
              <Button className={classes.doneButton} onClick={this.next}>
                Skip
              </Button>
            )}
          </CardActions>
        </Card>
      </OnboardingPage>
    );
  }

  next = () => {
    this.props.rootStore.onboardingStore.completeRecoveryPhrase();
  };

  showRecoveryPhrase = async () => {
    this.setState({ recoveryPhraseLoading: true });
    const {
      secretKey,
      recoveryPhrase
    } = await this.props.rootStore.userStore.getRecoveryPhrase();

    this.setState({ secretKey, recoveryPhrase, recoveryPhraseLoading: false });
  };
}

export default OnboardingRecoveryPhrasePage;
