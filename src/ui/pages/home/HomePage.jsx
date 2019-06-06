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
  Button,
  Card
} from '@material-ui/core';
import {
  Security as SecurityIcon,
  Email as EmailIcon,
  PhonelinkLock as PhonelinkLockIcon
} from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import Hero from './Hero';

import { observer, inject } from 'mobx-react';

import config from '../../config';

import { Link, ExternalLink } from '../../components';

const styles = theme => {
  return {
    root: {
      flex: '1 0 100%'
    },
    gridItem: {
      marginBottom: 8
    },
    infoCard: {
      padding: theme.spacing.unit * 6,
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4
    },
    infoCardParagraph: {
      fontSize: '1rem'
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
      <Card className={classes.infoCard}>
        <Typography className={classes.cardHeadline} gutterBottom variant="h5">
          {title}
        </Typography>
        {children}
      </Card>
    );
  }
}

@withStyles(styles)
@observer
class SecurityInfoCard extends React.Component {
  render() {
    return (
      <HomeInfoCard
        icon={SecurityIcon}
        title="Your XLM stays safe, even if your Secret Key is not"
      >
        <InfoCardParagraph>
          StellarGuard utilizes the Stellar network&apos;s{' '}
          <ExternalLink to="https://www.stellar.org/developers/guides/concepts/multi-sig.html">
            multisignature functionality
          </ExternalLink>{' '}
          to protect your account.
        </InfoCardParagraph>
        <InfoCardParagraph>
          That means that even if a hacker steals your secret key, your XLM
          stays safe.
        </InfoCardParagraph>
      </HomeInfoCard>
    );
  }
}

@withStyles(styles)
@observer
class InfoCardParagraph extends React.Component {
  render() {
    const { children, classes } = this.props;
    return (
      <Typography
        variant="body1"
        className={classes.infoCardParagraph}
        paragraph
      >
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
          work with your existing wallet. See some of the{' '}
          <Link to="/supported-wallets">supported wallets</Link>.
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
        <List disablePadding={true}>
          <ListItem>
            <Avatar className={classes.numbers}>1</Avatar>
            <ListItemText
              primary={
                <ExternalLink
                  to="javascript:void()"
                  onClick={this.onRegisterClick}
                >
                  Register for your FREE StellarGuard account
                </ExternalLink>
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
        <List disablePadding={true}>
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>StellarGuard</title>
        </Helmet>
        <Hero />
        <div className={classes.gridContainer}>
          <Grid container justify="space-between" spacing={0}>
            <Grid item xs={12} className={classes.gridItem}>
              <SecurityInfoCard />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <TwoFactorAuthInfoCard />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <UseYourWalletInfoCard />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <GetStartedInfoCard />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default HomePage;
