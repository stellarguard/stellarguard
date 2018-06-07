import React, { Component } from 'react';
import { withStyles, Button, Tooltip } from 'material-ui';
import { Add as AddIcon } from 'material-ui-icons';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 2
  }
});

@withStyles(styles)
@observer
class SubmitTransactionFab extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Tooltip id="tooltip-fab" className={classes.fab} title="New Transaction">
        <Button
          component={Link}
          to="/transactions/new"
          variant="fab"
          color="primary"
          aria-label="New Transaction"
          className={classes.button}
        >
          <AddIcon />
        </Button>
      </Tooltip>
    );
  }
}

export default SubmitTransactionFab;
