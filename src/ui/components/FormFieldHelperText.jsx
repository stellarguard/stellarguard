import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { observer } from 'mobx-react';

const styles = theme => ({
  hasError: {
    animation: `shake ${theme.transitions.duration.shortest}ms ${
      theme.transitions.easing.easeInOut
    } both`,
    display: 'inline-block'
  },
  '@keyframes shake': {
    '10%, 90%': {
      transform: `translate3d(-1px, 0, 0)`
    },

    '20%, 80%': {
      transform: `translate3d(-2px, 0, 0)`
    },

    '30%, 50%, 70%': {
      transform: `translate3d(-4px, 0, 0)`
    },

    '40%, 60%': {
      transform: `translate3d(4px, 0, 0)`
    }
  }
});

@observer
@withStyles(styles)
class FormFieldHelperText extends Component {
  render() {
    const { classes, children, error, touched } = this.props;
    return error && touched ? (
      <span className={classes.hasError}>{error}</span>
    ) : (
      children || ' '
    );
  }
}

export default FormFieldHelperText;
