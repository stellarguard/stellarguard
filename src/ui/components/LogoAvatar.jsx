import React, { Component } from 'react';
import { withStyles, Avatar } from 'material-ui';
import cx from 'classnames';

import stellarGuardLogo from '../images/favicon-32x32.png';

const styles = theme => ({
  logo: {
    width: 32,
    height: 32
  }
});

@withStyles(styles)
class LogoAvatar extends Component {
  render() {
    const { classes, className } = this.props;
    return (
      <Avatar className={cx(classes.logo, className)} src={stellarGuardLogo} />
    );
  }
}

export default LogoAvatar;
