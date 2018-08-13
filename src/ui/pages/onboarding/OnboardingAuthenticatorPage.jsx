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
import grey from '@material-ui/core/colors/grey';
import { PhonelinkLock as PhonelinkLockIcon } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';

import OnboardingPage from './OnboardingPage';

const styles = theme => ({
  avatar: {
    height: theme.spacing.unit * 12,
    width: theme.spacing.unit * 12,
    color: '#FFF',
    marginBottom: theme.spacing.unit,
    backgroundColor: grey[500]
  },
  avatarIcon: {
    height: '50%',
    width: '50%'
  },
  cta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  skipButton: {
    marginLeft: 'auto'
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class OnboardingAuthenticatorPage extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.rootStore.tfaStore.listenForAuthenticatorAdded(
      this.next
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { classes } = this.props;

    return (
      <OnboardingPage currentStep={1}>
        <Card>
          <CardHeader
            avatar={
              <Avatar>
                <PhonelinkLockIcon />
              </Avatar>
            }
            title="Enable 2-factor Authentication"
          />
          <CardContent>
            <Typography paragraph>
              Add another layer of security by requiring a rotating passcode
              when signing in. This also allows you to require the passcode when
              approving transactions.
            </Typography>
            <div className={classes.cta}>
              <Avatar className={classes.avatar}>
                <PhonelinkLockIcon className={classes.avatarIcon} />
              </Avatar>
              <Button
                size="large"
                variant="raised"
                color="primary"
                onClick={this.addAuthenticator}
              >
                Add Two Factor Auth
              </Button>
            </div>
          </CardContent>
          <CardActions>
            <Button className={classes.skipButton} onClick={this.next}>
              Skip
            </Button>
          </CardActions>
        </Card>
      </OnboardingPage>
    );
  }

  addAuthenticator = async () => {
    await this.props.rootStore.tfaStore.openAddAuthenticatorDialog();
  };

  next = () => {
    this.props.rootStore.onboardingStore.completeAddAuthenticator();
  };
}

export default OnboardingAuthenticatorPage;
