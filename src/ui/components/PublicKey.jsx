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
    const {
      rootStore,
      classes,
      publicKey,
      className,
      linkToStellarExpert = false
    } = this.props;
    const knownAccount = rootStore.accountsStore.isKnownAccount(publicKey);

    const content = (
      <span className={className}>
        {knownAccount && (
          <span className={classes.name}>[{knownAccount.name}]</span>
        )}
        <span className={cx(className, classes.publicKey)}>
          {this.getShortenedPublicKey(publicKey)}
        </span>
      </span>
    );

    if (linkToStellarExpert) {
      return (
        <StellarExpertLink href={`/account/${publicKey}`} title={publicKey}>
          {content}
        </StellarExpertLink>
      );
    } else {
      return content;
    }
  }

  getShortenedPublicKey(publicKey) {
    const prefixLength = 5;
    const suffixLength = 5;
    return `${publicKey.slice(0, prefixLength)}...${publicKey.slice(
      -suffixLength
    )}`;
  }
}

export default PublicKey;
