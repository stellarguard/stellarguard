import React, { Component, Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import { observer } from 'mobx-react';

const styles = theme => ({
  secretKey: {
    overflowWrap: 'break-word'
  }
});

@withStyles(styles)
@observer
class RecoveryPhraseSecretKey extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Write down and save your StellarGuard secret key.
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Keep it secret, keep it safe. You will not be shown this again.
        </Typography>
        <Typography
          className={classes.secretKey}
          align="center"
          variant="h5"
          color="primary"
        >
          {children}
        </Typography>
      </div>
    );
  }
}

export { RecoveryPhraseSecretKey };
