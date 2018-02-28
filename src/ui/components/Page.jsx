import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import PageTitle from './PageTitle';
import AppLoader from '../AppLoader';
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    height: '100%',
    minHeight: 'calc(100vh - 64px)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit
    },
    maxWidth: '1280px',
    margin: '0 auto'
  },
  body: {
    height: '100%'
  }
});

class Page extends Component {
  render() {
    const { classes, title, children, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <AppLoader />}
        <div className={classes.root}>
          {title && <PageTitle>{title}</PageTitle>}
          <div className={classes.body}>{children}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Page);
