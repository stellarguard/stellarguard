import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { observer } from 'mobx-react';

import config from '../config';
import ExternaLink from './ExternalLink';

const styles = theme => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

@withStyles(styles)
@observer
class StellarExpertLink extends Component {
  render() {
    const { children, href, ...rest } = this.props;
    const network = config.isPublicNetwork ? 'public' : 'testnet';
    return (
      <ExternaLink
        {...rest}
        href={`https://stellar.expert/explorer/${network}${href}`}
      >
        {children}
      </ExternaLink>
    );
  }
}

export { StellarExpertLink };
