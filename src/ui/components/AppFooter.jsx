import React, { Component, Fragment } from 'react';
import { withStyles, Divider, Typography, Grid } from 'material-ui';

import DonateDialog from './DonateDialog';

import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.light
  },
  footer: {
    color: '#FFF',
    padding: theme.spacing.unit * 2
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer'
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
          <Divider />
          <Grid container spacing={0} className={classes.footer}>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <Typography
                variant="headline"
                color="inherit"
                gutterBottom
                className={classes.stellarguard}
              >
                StellarGuard.me
              </Typography>
              <Typography
                color="inherit"
                className={classes.copyright}
                gutterBottom
              >
                2018 © StellarGuard L.L.C.
              </Typography>
              <Typography color="inherit">help@stellarguard.me</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="inherit" variant="title" gutterBottom>
                Links
              </Typography>
              <ExternalFooterLink onClick={this.openDonateDialog}>
                Donate
              </ExternalFooterLink>
              <FooterLink className={classes.link} to="/faq">
                FAQ
              </FooterLink>
              <ExternalFooterLink href="https://github.com/stellarguard/stellarguard-issues/issues">
                Request a Feature or Report a Bug
              </ExternalFooterLink>
              <ExternalFooterLink href="https://www.reddit.com/r/StellarGuard/">
                Discussion Forum
              </ExternalFooterLink>
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
