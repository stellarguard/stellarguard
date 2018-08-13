import React, { Component } from 'react';
import { withStyles, CircularProgress, Avatar } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import { CheckCircle, Check, Error } from '@material-ui/icons';
import { observer } from 'mobx-react';
import cx from 'classnames';

const styles = theme => ({
  status: {
    height: theme.spacing.unit * 12,
    width: theme.spacing.unit * 12,
    position: 'relative',
    color: '#FFF',
    marginBottom: theme.spacing.unit
  },
  statusPending: {
    backgroundColor: grey[500]
  },
  statusSuccess: {
    backgroundColor: green[500]
  },
  statusError: {
    backgroundColor: theme.palette.error.main
  },
  statusIcon: {
    height: '50%',
    width: '50%'
  },
  progress: {
    position: 'absolute',
    top: '-10%',
    left: '-10%'
  }
});

@withStyles(styles)
@observer
class CircularStatusSpinner extends Component {
  render() {
    const { classes, pending, success, error } = this.props;
    const {
      SuccessIcon = CheckCircle,
      PendingIcon = Check,
      ErrorIcon = Error
    } = this.props;

    const statusClasses = cx(classes.status, {
      [classes.statusPending]: pending,
      [classes.statusSuccess]: success,
      [classes.statusError]: error
    });

    return (
      <div className={classes.status}>
        <Avatar className={statusClasses}>
          {success && <SuccessIcon className={classes.statusIcon} />}
          {pending && <PendingIcon className={classes.statusIcon} />}
          {error && <ErrorIcon className={classes.statusIcon} />}
        </Avatar>
        {pending && (
          <CircularProgress
            thickness={2}
            size="120%"
            className={classes.progress}
          />
        )}
      </div>
    );
  }
}

export default CircularStatusSpinner;
