import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import ExternalLink from './ExternalLink';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit
  }
});

@withStyles(styles)
class RecaptchaDisclaimer extends Component {
  render() {
    return (
      <Typography className={this.props.classes.root} variant="caption">
        This site is protected by reCAPTCHA and the Google{' '}
        <ExternalLink href="https://policies.google.com/privacy">
          Privacy Policy
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink href="https://policies.google.com/terms">
          Terms of Service
        </ExternalLink>{' '}
        apply.
      </Typography>
    );
  }
}

export { RecaptchaDisclaimer };
