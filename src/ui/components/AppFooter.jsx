import React, { Component } from 'react';
import { withStyles, Divider } from 'material-ui';
import grey from 'material-ui/colors/grey';

const styles = theme => ({
  root: {
    backgroundColor: grey[200]
  },
  footer: {
    display: 'flex',
    padding: theme.spacing.unit * 2
  },
  links: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit
  },
  link: {
    marginRight: theme.spacing.unit * 2,
    color: grey[900],
    textDecoration: 'none',
    cursor: 'pointer'
  }
});

@withStyles(styles)
class AppFooter extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Divider />
        <div className={classes.footer}>
          <div className={classes.copyright}>2018 © StellarGuard</div>
          <div className={classes.links}>
            <a
              href="https://github.com/stellarguard/stellarguard-issues/issues"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              Bugs and Feature Requests
            </a>
            <a
              href="https://www.reddit.com/r/StellarGuard/"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              Discussion Forum
            </a>
            {/* <a className={classes.link}>Donate</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default AppFooter;
