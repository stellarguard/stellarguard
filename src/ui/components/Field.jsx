import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';
import { observer } from 'mobx-react';

import FormHelp from './FormHelp';

const styles = theme => ({
  field: {
    display: 'flex',
    alignContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  label: {
    fontWeight: 500,
    width: '80px',
    textAlign: 'right',
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      textAlign: 'left'
    }
  },
  help: {},
  content: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      marginLeft: 0
    }
  }
});

@withStyles(styles)
@observer
class Field extends Component {
  render() {
    const { classes, label, children, help } = this.props;
    return (
      <Typography component="div" className={classes.field} gutterBottom>
        <label className={classes.label}>
          {label}
          {help && <FormHelp>{help}</FormHelp>}
        </label>
        <div className={classes.content}>{children}</div>
      </Typography>
    );
  }
}

export default Field;
