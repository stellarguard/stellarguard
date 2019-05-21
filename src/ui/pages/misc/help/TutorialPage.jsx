import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { Page, DashboardFab } from '../../../components';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    description: {
      marginBottom: theme.spacing.unit * 4
    }
  };
};

@withStyles(styles)
@withRouter
@observer
class TutorialPage extends Component {
  render() {
    const { classes, title, description, children } = this.props;

    return (
      <Page title={title}>
        <Helmet>
          <title>StellarGuard | Tutorials</title>
        </Helmet>
        <div className={classes.tutorial}>
          <Typography
            className={classes.description}
            align="center"
            variant="subtitle1"
          >
            {description}
          </Typography>
          {children}
        </div>
        <DashboardFab />
      </Page>
    );
  }
}

export default TutorialPage;
