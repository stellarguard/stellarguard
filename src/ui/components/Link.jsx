import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

@observer
@withStyles(styles)
class Link extends Component {
  render() {
    const { classes, children, ...rest } = this.props;
    return (
      <RouterLink className={classes.link} {...rest}>
        {children}
      </RouterLink>
    );
  }
}

export default Link;
