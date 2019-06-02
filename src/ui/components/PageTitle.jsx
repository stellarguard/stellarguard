import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Helmet from 'react-helmet';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit * 3
  }
});

class PageTitle extends Component {
  render() {
    const { classes, children } = this.props;
    return [
      <Helmet key="helmet">
        <title>StellarGuard | {children}</title>
      </Helmet>,
      <Typography key="title" className={classes.title} variant="h4">
        {children}
      </Typography>
    ];
  }
}

export default withStyles(styles)(PageTitle);
