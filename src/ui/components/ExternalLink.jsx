import React, { Component } from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core';
import { observer } from 'mobx-react';

const styles = theme => ({
  link: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

@withStyles(styles)
@observer
class ExternalLink extends Component {
  render() {
    const {
      classes,
      className,
      children,
      to,
      href,
      target = '_blank',
      ...rest
    } = this.props;
    return (
      <a
        className={cx(classes.link, className)}
        target={target}
        rel="noopener noreferrer"
        href={to || href}
        {...rest}
      >
        {children}
      </a>
    );
  }
}

export default ExternalLink;
