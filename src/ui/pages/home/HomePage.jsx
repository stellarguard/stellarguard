import React from 'react';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
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
      textDecoration: 'none'
    },
    infoCard: {},
    cardHeadline: {
      marginBottom: theme.spacing.unit
    },
    cardParagraph: {
      marginTop: theme.spacing.unit
    }
  };
};

@withStyles(styles)
class HomeInfoCard extends React.Component {
  render() {
    const { classes, children, title, icon } = this.props;
    return (
      <Card>
        <CardContent className={classes.infoCard}>
          <Typography className={classes.cardHeadline} variant="headline">
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    );
  }
}

@withStyles(styles)
class SecurityInfoCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <HomeInfoCard
        icon={SecurityIcon}
        title="Your XLM stays safe, even if your Secret Key is not"
      >
        <InfoCardParagraph>
          StellarGuard utilizes the Stellar network's{' '}
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
class InfoCardParagraph extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <Typography component="p" className={classes.cardParagraph}>
        {children}
      </Typography>
    );
  }
}

@withStyles(styles)
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
                <a
                  className={classes.link}
                  href={this.stellarTransactionSignerHref}
                  target="_blank"
                  rel="noopener"
                >
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
}

@withStyles(styles)
class TwoFactorAutheInfoCard extends React.Component {
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
              secondary="Use an authenticator app with rotating passcodes"
            />
          </ListItem>
        </List>
      </HomeInfoCard>
    );
  }
}

@withStyles(styles)
class HomePage extends React.Component {
  state = { showToast: false };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ showToast: true });
      setTimeout(() => {
        this.setState({ showToast: false });
      }, 10000);
    }, 2500);
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
          message="This is the test version of StellarGuard. All transactions will be submitted to the Stellar Testnet."
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
              <TwoFactorAutheInfoCard />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default HomePage;
