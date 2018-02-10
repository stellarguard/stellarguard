import React, { Component } from 'react';
import { withStyles } from 'material-ui';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 4
  }
});

class FormActions extends Component {
  render() {
    const { classes, children } = this.props;
    return <div className={classes.actions}>{children}</div>;
  }
}

export default withStyles(styles)(FormActions);
