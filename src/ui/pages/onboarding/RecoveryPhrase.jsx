import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import { observer } from 'mobx-react';

import { RecoveryPhraseWord } from './RecoveryPhraseWord';

const styles = theme => ({
  phrase: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  }
});

@withStyles(styles)
@observer
class RecoveryPhrase extends Component {
  render() {
    const { classes, recoveryPhrase } = this.props;

    return (
      <div>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Write down and save your recovery phrase.
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Keep it secret, keep it safe. You will not be shown this again.
        </Typography>
        <div className={classes.phrase}>
          {recoveryPhrase.map((word, i) => (
            <RecoveryPhraseWord key={word} word={word} number={i + 1} />
          ))}
        </div>
      </div>
    );
  }
}

export { RecoveryPhrase };
