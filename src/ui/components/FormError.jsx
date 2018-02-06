import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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
    if (!errors || !errors.error) {
      return '';
    }

    return errors.error;
  }
}

export default withStyles(styles)(FormError);
