import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit
  },
  content: {}
});

@observer
@withStyles(styles)
class OperationWrapper extends Component {
  render() {
    const { classes, children, type } = this.props;
    return (
      <div>
        <Typography className={classes.title} variant="subtitle1">
          {type}
        </Typography>
        <div className={classes.content}>{children}</div>
      </div>
    );
  }
}

export default OperationWrapper;
