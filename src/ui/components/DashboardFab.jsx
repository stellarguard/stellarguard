import React, { Component } from 'react';
import { withStyles, Fab, Tooltip } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

@withStyles(styles)
@observer
class DashboardFab extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Tooltip id="tooltip-fab" title="Home">
        <Fab
          component={Link}
          to="/"
          color="primary"
          aria-label="Home"
          className={classes.button}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>
    );
  }
}

export default DashboardFab;
