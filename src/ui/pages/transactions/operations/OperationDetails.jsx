import React, { Component } from 'react';
import { withStyles } from 'material-ui';
import { observer } from 'mobx-react';

const styles = theme => ({
  details: {
    marginTop: theme.spacing.unit
  }
});

@observer
@withStyles(styles)
class OperationDetails extends Component {
  render() {
    const { classes, children } = this.props;
    return <div className={classes.details}>{children}</div>;
  }
}

export default OperationDetails;
