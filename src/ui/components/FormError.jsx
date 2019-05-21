import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing.unit
  }
});

class FormError extends Component {
  get hasErrors() {
    const errors = this.props.errors;
    return errors && errors.error;
  }

  render() {
    const { classes, errors } = this.props;
    if (!this.hasErrors) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Typography color="error" variant="subtitle1">
          {errors.error}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(FormError);
