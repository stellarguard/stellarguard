import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import PageTitle from './PageTitle';
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    height: '100%',
    minHeight: 'calc(100vh - 64px)',
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  body: {
    height: '100%'
  }
});

class Page extends Component {
  render() {
    const { classes, title, children } = this.props;
    return (
      <div className={classes.root}>
        {title && <PageTitle>{title}</PageTitle>}
        <div className={classes.body}>{children}</div>
      </div>
    );
  }
}

export default withStyles(styles)(Page);
