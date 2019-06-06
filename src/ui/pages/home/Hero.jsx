import React, { Component } from 'react';
import { withStyles, Typography, Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import config from '../../config';
import { ButtonLink } from '../../components';

import logo from '../../images/logo.svg';

const styles = theme => ({
  hero: {
    minHeight: '40vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: theme.palette.primary.main
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },
  actions: {
    marginTop: theme.spacing.unit * 4
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2
  },
  getStarted: {
    marginRight: theme.spacing.unit
  },
  text: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headline: {
    maxWidth: 600,
    textAlign: 'center'
  },
  logo: {
    margin: '20px 0',
    height: '25vw',
    maxHeight: 150
  }
});

@withStyles(styles)
@inject('rootStore')
@observer
class Hero extends Component {
  handleSignInOpen = () => {
    this.props.rootStore.uiState.openSignInDialog();
  };

  handleRegisterOpen = () => {
    this.props.rootStore.uiState.openRegisterDialog();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.hero}>
        <div className={classes.content}>
          <img
            src={logo}
            alt="StellarGuard Logo - by https://www.reddit.com/user/b1tcc"
            className={classes.logo}
          />
          <div className={classes.text}>
            <Typography
              variant="h3"
              component="h1"
              color="inherit"
              gutterBottom
            >
              <span className={classes.name}>StellarGuard</span>
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              color="inherit"
              className={classes.headline}
            >
              {'Security for your Stellar account'}
            </Typography>
            <div className={classes.actions}>
              <div className={classes.buttons}>
                <Button
                  data-test="hero-get-started-button"
                  className={classes.getStarted}
                  color="secondary"
                  variant="raised"
                  onClick={this.handleRegisterOpen}
                >
                  Get Started for Free
                </Button>
                <ButtonLink to="/faq" color="secondary">
                  Learn More
                </ButtonLink>
              </div>
              <Typography gutterBottom variant="subtitle1">
                Already have an account?{' '}
                <Button
                  data-test="hero-sign-in-button"
                  color="secondary"
                  onClick={this.handleSignInOpen}
                >
                  Sign in
                </Button>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
