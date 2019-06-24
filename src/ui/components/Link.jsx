import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classnames';

const styles = theme => ({
  link: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

@observer
@withStyles(styles)
class Link extends Component {
  render() {
    const { classes, className, children, ...rest } = this.props;
    return (
      <RouterLink className={cx(classes.link, className)} {...rest}>
        {children}
      </RouterLink>
    );
  }
}

export default Link;
