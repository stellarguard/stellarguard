import React from 'react';
import {
  withStyles,
  Grid,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Button
} from 'material-ui';
import {
  Security as SecurityIcon,
  Email as EmailIcon,
  PhonelinkLock as PhonelinkLockIcon
} from 'material-ui-icons';
import { Helmet } from 'react-helmet';
import Hero from './Hero';

import { observer, inject } from 'mobx-react';

import config from '../../config';

const styles = theme => {
  return {
    root: {
      flex: '1 0 100%'
    },
    gridContainer: {
      padding: theme.spacing.unit,
      overflow: 'hidden'
    },
    link: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      textDecoration: 'none'
    },
    secondaryLink: {
      color: theme.palette.secondary.main,
      textDecoration: 'none'
    },
    infoCard: {
      padding: theme.spacing.unit
    },
    cardHeadline: {
      marginBottom: theme.spacing.unit * 2
    },
    cardParagraph: {
      marginTop: theme.spacing.unit
    }
  };
};

@withStyles(styles)
@observer
class HomeInfoCard extends React.Component {
  render() {
    const { classes, children, title } = this.props;
    return (
      <div className={classes.infoCard}>
        <Typography
          className={classes.cardHeadline}
          gutterBottom
          variant="headline"
        >
          {title}
        </Typography>
        <Typography variant="body1">{children}</Typography>
      </div>
    );
  }
}

@withStyles(styles)
@observer
class SecurityInfoCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <HomeInfoCard
        icon={SecurityIcon}
        title="Your XLM stays safe, even if your Secret Key is not"
      >
        <InfoCardParagraph>
          StellarGuard utilizes the Stellar network&apos;s{' '}
          <a
            className={classes.link}
            href="https://www.stellar.org/developers/guides/concepts/multi-sig.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            multisignature functionality
          </a>{' '}
          to protect your account.
        </InfoCardParagraph>
        <InfoCardParagraph>
          That means that even if a hacker steals your secret key, StellarGuard
          will prevent him from taking your XLM.
        </InfoCardParagraph>
        <InfoCardParagraph>
          If StellarGuard had been around during the Blackwallet hack, accounts
          protected by it would have been completely safe.
        </InfoCardParagraph>
      </HomeInfoCard>
    );
  }
}

@withStyles(styles)
@observer
class InfoCardParagraph extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Typography variant="body1" paragraph>
        {children}
      </Typography>
    );
  }
}

@withStyles(styles)
@observer
class UseYourWalletInfoCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <HomeInfoCard title="Works with your existing Stellar Wallet">
        <InfoCardParagraph>
          Already using a Stellar wallet? No problem! StellarGuard was built to
          work with your existing wallet.
        </InfoCardParagraph>
        <InfoCardParagraph>
          StellarGuard can enhance any wallet by adding multi-sig and two-factor
          authentication to your transactions.
        </InfoCardParagraph>
      </HomeInfoCard>
    );
  }
}

@withStyles(styles)
@inject('rootStore')
@observer
class GetStartedInfoCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <HomeInfoCard title="Get started in 3 easy steps">
        <List>
          <ListItem>
            <Avatar className={classes.numbers}>1</Avatar>
            <ListItemText
              primary={
                <a className={classes.link} onClick={this.onRegisterClick}>
                  Register for your FREE StellarGuard account
                </a>
              }
            />
          </ListItem>
          <ListItem>
            <Avatar className={classes.numbers}>2</Avatar>
            <ListItemText primary="Add your StellarGuard public key as an additional signer" />
          </ListItem>
          <ListItem>
            <Avatar className={classes.numbers}>3</Avatar>
            <ListItemText primary="Submit transactions to StellarGuard" />
          </ListItem>
        </List>
      </HomeInfoCard>
    );
  }

  onRegisterClick = () => this.props.rootStore.uiState.openRegisterDialog();
}

@withStyles(styles)
@observer
class TwoFactorAuthInfoCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <HomeInfoCard title="Additional security with two factor auth">
        <InfoCardParagraph>
          StellarGuard supports two ways to authorize your transactions:
        </InfoCardParagraph>
        <List>
          <ListItem>
            <Avatar className={classes.numbers}>
              <EmailIcon />
            </Avatar>
            <ListItemText
              primary="Email"
              secondary="A transaction authorization code is emailed to you"
            />
          </ListItem>
          <ListItem>
            <Avatar className={classes.numbers}>
              <PhonelinkLockIcon />
            </Avatar>
            <ListItemText
              primary="Authenticator"
              secondary="Use a free authenticator app with rotating passcodes"
            />
          </ListItem>
        </List>
      </HomeInfoCard>
    );
  }
}

@withStyles(styles)
@observer
class HomePage extends React.Component {
  state = { showToast: false };
  componentDidMount() {
    if (config.isTestNetwork) {
      setTimeout(() => {
        this.setState({ showToast: true });
        setTimeout(() => {
          this.setState({ showToast: false });
        }, 10000);
      }, 2500);
    }
  }
  render() {
    const { classes } = this.props;
    const { showToast } = this.state;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>StellarGuard</title>
        </Helmet>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showToast}
          message={
            <div>
              This is the test version of StellarGuard. All transactions will be
              submitted to the Stellar Testnet. To create a Stellar account on
              the Testnet,{' '}
              <a
                className={classes.secondaryLink}
                href="https://www.stellar.org/laboratory/#account-creator?network=test"
                target="_blank"
                rel="noopener noreferrer"
              >
                go here.
              </a>
            </div>
          }
          action={
            <Button
              color="secondary"
              size="small"
              onClick={() => this.setState({ showToast: false })}
            >
              OK
            </Button>
          }
        />
        <Hero />
        <div className={classes.gridContainer}>
          <Grid container justify="space-around" spacing={16}>
            <Grid item xs={12} sm={12} md={6}>
              <SecurityInfoCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <UseYourWalletInfoCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <GetStartedInfoCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TwoFactorAuthInfoCard />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default HomePage;
