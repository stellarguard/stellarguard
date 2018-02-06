import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import logo from '../../images/logo.png';
import SignInDialog from '../signIn/SignInDialog';
import RegisterDialog from '../register/RegisterDialog';

import { inject, observer } from 'mobx-react';

const styles = theme => ({
  hero: {
    minHeight: '40vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  guard: {
    color: theme.palette.secondary.main
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8
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
    maxWidth: 500,
    textAlign: 'center'
  },
  logo: {
    margin: '20px 0',
    height: '35vw',
    maxHeight: 200
  }
});

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
    const { rootStore, classes } = this.props;

    return (
      <div className={classes.hero}>
        <div className={classes.content}>
          <img src={logo} alt="StellarGuard Logo" className={classes.logo} />
          <div className={classes.text}>
            <Typography
              variant="display2"
              component="h1"
              color="inherit"
              gutterBottom
            >
              <span>Stellar</span>
              <span className={classes.guard}>Guard</span>
            </Typography>
            <Typography
              variant="headline"
              component="h2"
              color="inherit"
              className={classes.headline}
            >
              {'Keep your XLM safe and secure.'}
            </Typography>
            <div className={classes.actions}>
              <div className={classes.buttons}>
                <Button
                  className={classes.getStarted}
                  color="secondary"
                  variant="raised"
                  onClick={this.handleRegisterOpen}
                >
                  Get Started
                </Button>
                <Button color="inherit" className={classes.learnMore}>
                  Learn More
                </Button>
              </div>
              <Typography color="inherit" variant="subheading">
                Already have an account?{' '}
                <Button color="secondary" onClick={this.handleSignInOpen}>
                  Sign in.
                </Button>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Hero);
