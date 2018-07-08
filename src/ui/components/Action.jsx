import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import cx from 'classnames';

const styles = theme => ({
  action: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.main
  }
});

@withStyles(styles)
class Action extends Component {
  render() {
    const { classes, children, className, ...rest } = this.props;
    return (
      <span className={cx(classes.action, className)} {...rest}>
        {children}
      </span>
    );
  }
}

export default Action;
