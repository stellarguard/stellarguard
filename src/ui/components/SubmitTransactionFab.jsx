import React, { Component } from 'react';
import { withStyles, Fab, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
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
class SubmitTransactionFab extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Tooltip id="tooltip-fab" title="New Transaction">
        <Fab
          component={Link}
          to="/transactions/new"
          color="secondary"
          aria-label="New Transaction"
          className={classes.button}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    );
  }
}

export default SubmitTransactionFab;
