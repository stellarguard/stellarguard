import React, { Component, Fragment } from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';

import DonateDialog from './DonateDialog';

import config from '../config';

import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 6
  },
  footer: {
    [theme.breakpoints.only('xs')]: {
      padding: `0 ${theme.spacing.unit * 2}px`
    },
    [theme.breakpoints.only('sm')]: {
      padding: '0 5%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 10%'
    }
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.text.secondary
  },
  gridItem: {
    marginBottom: theme.spacing.unit * 2
  }
});

const ExternalFooterLink = withStyles(styles)(
  ({ children, classes, ...rest }) => {
    return (
      <Typography
        gutterBottom
        component="a"
        target="_blank"
        color="inherit"
        rel="noopener noreferrer"
        className={classes.link}
        {...rest}
      >
        {children}
      </Typography>
    );
  }
);

const FooterLink = withStyles(styles)(({ children, classes, ...rest }) => {
  return (
    <Typography
      color="inherit"
      gutterBottom
      component={Link}
      className={classes.link}
      {...rest}
    >
      {children}
    </Typography>
  );
});

@withStyles(styles)
class AppFooter extends Component {
  state = {
    isDonateOpen: false
  };

  render() {
    const { classes } = this.props;
    const { isDonateOpen } = this.state;
    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container spacing={0} className={classes.footer}>
            <Grid item xs={12} sm={6} className={classes.gridItem}>
              <Typography
                variant="h5"
                gutterBottom
                className={classes.stellarguard}
              >
                StellarGuard
              </Typography>
              <Typography
                color="inherit"
                className={classes.copyright}
                gutterBottom
              >
                2019 © StellarGuard LLC
              </Typography>
              <Typography color="inherit" gutterBottom>
                help@stellarguard.me
              </Typography>
              <Typography color="inherit" gutterBottom>
                v{config.version}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom>
                Links
              </Typography>
              <ExternalFooterLink onClick={this.openDonateDialog}>
                Donate
              </ExternalFooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/supported-wallets">Supported Wallets</FooterLink>
              <ExternalFooterLink href="https://github.com/stellarguard/stellarguard">
                Source Code
              </ExternalFooterLink>
              <ExternalFooterLink href="https://medium.com/@stellarguard">
                Blog
              </ExternalFooterLink>
              <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            </Grid>
          </Grid>
        </div>
        <DonateDialog open={isDonateOpen} onClose={this.closeDonateDialog} />
      </Fragment>
    );
  }

  openDonateDialog = () => {
    this.setState({ isDonateOpen: true });
  };

  closeDonateDialog = () => {
    this.setState({ isDonateOpen: false });
  };
}

export default AppFooter;
