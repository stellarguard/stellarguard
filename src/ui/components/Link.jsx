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
  onClick = event => {
    const { onClick, to } = this.props;
    if (!to) {
      event.preventDefault();
    }

    if (onClick) {
      return onClick(event);
    }
  };

  render() {
    const { classes, className, children, ...rest } = this.props;
    return (
      <RouterLink
        className={cx(classes.link, className)}
        {...rest}
        onClick={this.onClick}
      >
        {children}
      </RouterLink>
    );
  }
}

export default Link;
