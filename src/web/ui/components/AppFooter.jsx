import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({});

class AppFooter extends Component {
  render() {
    const { classes, children } = this.props;
    return <div>{children}</div>;
  }
}

export default withStyles(styles)(AppFooter);
