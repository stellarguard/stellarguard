import React, { Component } from 'react';
import { withStyles, Chip, Avatar } from '@material-ui/core';

import { observer } from 'mobx-react';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

@withStyles(styles)
@observer
class RecoveryPhraseWord extends Component {
  render() {
    const { classes, word, number } = this.props;

    return (
      <Chip
        color="primary"
        avatar={<Avatar>{number}</Avatar>}
        label={word}
        className={classes.root}
      />
    );
  }
}

export { RecoveryPhraseWord };
