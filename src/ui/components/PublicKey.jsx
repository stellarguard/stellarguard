import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import cx from 'classnames';

import { observer, inject } from 'mobx-react';

import { StellarExpertLink } from './StellarExpertLink';

const styles = theme => ({
  publicKey: {
    overflowWrap: 'break-word'
  },
  name: {
    marginRight: 2
  }
});

@inject('rootStore')
@withStyles(styles)
@observer
class PublicKey extends Component {
  render() {
    const { rootStore, classes, publicKey, className } = this.props;
    const knownAccount = rootStore.accountsStore.isKnownAccount(publicKey);

    return (
      <StellarExpertLink href={`/account/${publicKey}`} title={publicKey}>
        <span className={className}>
          {knownAccount && (
            <span className={classes.name}>({knownAccount.name})</span>
          )}
          <span className={cx(className, classes.publicKey)}>
            {this.getShortenedPublicKey(publicKey, knownAccount)}
          </span>
        </span>
      </StellarExpertLink>
    );
  }

  getShortenedPublicKey(publicKey, knownAccount) {
    const prefixLength = knownAccount ? 1 : 4;
    return `${publicKey.slice(0, prefixLength)}... ${publicKey.slice(-4)}`;
  }
}

export default PublicKey;
