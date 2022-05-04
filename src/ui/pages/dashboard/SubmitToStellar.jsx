import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText
} from '@material-ui/core';

import { inject, observer } from 'mobx-react';
import config from '../../config';

import { CopyToClipboard, Link, ExternalLink } from '../../components';

const styles = theme => ({
  numbers: {
    backgroundColor: theme.palette.primary.main
  }
});

@inject('rootStore')
@observer
class SubmitMultiSigToStellar extends Component {
  get stellarTransactionSignerHref() {
    const xdr = this.props.rootStore.uiState.addStellarUiState.xdr;
    const network = config.isTestNetwork ? 'test' : 'public';
    return `https://laboratory.stellar.org/#txsigner?xdr=${encodeURIComponent(
      xdr
    )}&network=${network}`;
  }

  activateStellarGuard = () => {
    this.props.rootStore.uiState.addStellarUiState.goNext();
  };

  render() {
    const { classes, rootStore } = this.props;
    const xdr = this.props.rootStore.uiState.addStellarUiState.xdr;
    return (
      <div>
        <Typography variant="h6">
          Sign &amp; Submit to Stellar Network
        </Typography>
        <List>
          <ListItem>
            <Avatar className={classes.numbers}>1</Avatar>
            <ListItemText
              primary={
                <div>
                  <ExternalLink to={this.stellarTransactionSignerHref}>
                    Sign and submit the transaction at Stellar.org
                  </ExternalLink>{' '}
                  or{' '}
                  <CopyToClipboard text={xdr}>
                    <Link>
                      Copy the transaction XDR to submit to your own wallet
                    </Link>
                  </CopyToClipboard>
                </div>
              }
            />
          </ListItem>
          <ListItem>
            <Avatar className={classes.numbers}>2</Avatar>
            <ListItemText
              primary={
                <span>
                  After submitting,{' '}
                  <Link onClick={this.activateStellarGuard}>
                    Activate StellarGuard
                  </Link>
                </span>
              }
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(SubmitMultiSigToStellar);
