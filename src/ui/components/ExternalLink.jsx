import React, { Component } from 'react';
import cx from 'classnames';
import { withStyles } from 'material-ui';
import { observer } from 'mobx-react';

const styles = theme => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

@withStyles(styles)
@observer
class ExternalLink extends Component {
  render() {
    const { classes, className, children, ...rest } = this.props;
    return (
      <a
        className={cx(classes.link, className)}
        target="_blank"
        rel="noopener"
        {...rest}
      >
        {children}
      </a>
    );
  }
}

export default ExternalLink;
