import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing.unit * 2
  }
});

class FormError extends Component {
  render() {
    const { classes, children } = this.props;
    return <div className={classes.root}>{children}</div>;
  }
}

export default withStyles(styles)(FormError);
