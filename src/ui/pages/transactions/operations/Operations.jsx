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
    const { classes, operations } = this.props;
    return (
      <div>
        {operations.map((operation, index) => (
          <Operation key={index} operation={operation} />
        ))}
      </div>
    );
  }
}

export default Operations;
