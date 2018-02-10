import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';

const styles = theme => ({});

class AppFooter extends Component {
  render() {
    const { classes, children } = this.props;
    return <div>{children}</div>;
  }
}

export default withStyles(styles)(AppFooter);
