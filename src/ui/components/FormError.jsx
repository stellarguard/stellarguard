import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';

const styles = theme => ({
  root: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing.unit * 2
  }
});

class FormError extends Component {
  render() {
    const { classes, errors } = this.props;
    return (
      <div className={classes.root}>
        <Typography color="error" variant="subheading">
          {this.renderErrors(errors)}
        </Typography>
      </div>
    );
  }

  renderErrors(errors) {
    return (errors && errors.all) || null;
  }
}

export default withStyles(styles)(FormError);
