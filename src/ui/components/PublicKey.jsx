import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import cx from 'classnames';

const styles = theme => ({
  publicKey: {
    overflowWrap: 'break-word'
  }
});

@withStyles(styles)
class PublicKey extends Component {
  render() {
    const { classes, children, className } = this.props;
    return <span className={cx(className, classes.publicKey)}>{children}</span>;
  }
}

export default PublicKey;
