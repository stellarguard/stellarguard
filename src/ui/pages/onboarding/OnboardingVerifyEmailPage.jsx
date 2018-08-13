import React, { Component, Fragment } from 'react';
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
import green from '@material-ui/core/colors/green';
import { Email as EmailIcon, Check as CheckIcon } from '@material-ui/icons';

import { inject, observer } from 'mobx-react';

import OnboardingPage from './OnboardingPage';

import { CircularStatusSpinner, LoadingButton } from '../../components';

const styles = theme => ({
  avatar: {},
  status: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resendEmailCheck: {
    color: green[500],
    marginRight: 4
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class OnboardingVerifyEmailPage extends Component {
  state = {};

  componentDidMount() {
    this.stopListening = this.props.rootStore.onboardingStore.listenForEmailVerification(
      this.onEmailVerified
    );
  }

  componentWillUnmount() {
    this.stopListening && this.stopListening();
    clearTimeout(this.transitionTimeout);
  }

  onEmailVerified = () => {
    this.transitionTimeout = setTimeout(() => this.next(), 2000);
  };

  render() {
    const { classes, rootStore } = this.props;
    const { resendEmailStatus } = this.state;

    const resendEmailLoading = resendEmailStatus === 'loading';
    const resendEmailSuccess = resendEmailStatus === 'sent';

    return (
      <OnboardingPage currentStep={0}>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <EmailIcon />
              </Avatar>
            }
            title="Verify your email address"
            subheader={rootStore.currentUser.email}
          />
          <CardContent>
            <Typography paragraph>
              StellarGuard sends an email when there is a new transaction to
              authorize. To allow transaction emails to be sent you must first
              verify your email address.
            </Typography>
            <Typography paragraph>
              An email has been sent to{' '}
              <strong>{rootStore.currentUser.email}</strong> with instructions.
              Click on the link in that email and then come back here.
            </Typography>

            <div className={classes.status}>
              <CircularStatusSpinner
                PendingIcon={EmailIcon}
                SuccessIcon={EmailIcon}
                pending={!rootStore.currentUser.isEmailVerified}
                success={rootStore.currentUser.isEmailVerified}
              />
            </div>
          </CardContent>
          <CardActions>
            <LoadingButton
              color="primary"
              onClick={this.resendEmail}
              loading={resendEmailLoading}
              success={resendEmailSuccess}
            >
              {resendEmailSuccess ? (
                <Fragment>
                  <CheckIcon
                    key="check"
                    className={classes.resendEmailCheck}
                    color="inherit"
                  />{' '}
                  Sent
                </Fragment>
              ) : (
                'Resend Email'
              )}
            </LoadingButton>
          </CardActions>
        </Card>
      </OnboardingPage>
    );
  }

  next = () => {
    this.props.rootStore.onboardingStore.completeVerifyEmail();
  };

  resendEmail = async () => {
    try {
      this.setState({ resendEmailStatus: 'loading' });
      await this.props.rootStore.sessionStore.resendVerifyEmailAddressEmail();
      this.setState({ resendEmailStatus: 'sent' });
    } catch (e) {
      this.setState({ resendEmailStatus: 'error' });
    }
  };
}

export default OnboardingVerifyEmailPage;
