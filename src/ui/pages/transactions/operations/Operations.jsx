import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';
import Operation from './Operation';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit * 2
  }
});

@withStyles(styles)
class Operations extends Component {
  render() {
    const { classes, children, operations } = this.props;
    return (
      <div>
        <Typography className={classes.title} variant="title">
          Operations ({operations.length})
        </Typography>
        {operations.map(operation => (
          <Operation key={operation.id} operation={operation} />
        ))}
      </div>
    );
  }
}

export default Operations;
