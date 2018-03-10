import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText
} from 'material-ui';

import { inject, observer } from 'mobx-react';
import config from '../../config';

import { CopyToClipboard } from '../../components';

const styles = theme => ({
  numbers: {
    backgroundColor: theme.palette.primary.main
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer'
  }
});

@inject('rootStore')
@observer
class SubmitMultiSigToStellar extends Component {
  get stellarTransactionSignerHref() {
    const xdr = this.props.rootStore.uiState.addStellarUiState.xdr;
    const network = config.isTestNetwork ? 'test' : 'public';
    return `https://www.stellar.org/laboratory/#txsigner?xdr=${encodeURIComponent(
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
        <Typography variant="title">
          Sign &amp; Submit to Stellar Network
        </Typography>
        <List>
          <ListItem>
            <Avatar className={classes.numbers}>1</Avatar>
            <ListItemText
              primary={
                <div>
                  <a
                    className={classes.link}
                    href={this.stellarTransactionSignerHref}
                    target="_blank"
                    rel="noopener"
                  >
                    Sign and submit the transaction at Stellar.org
                  </a>{' '}
                  or{' '}
                  <CopyToClipboard text={xdr}>
                    <span className={classes.link}>
                      Copy the transaction XDR to submit to your own wallet
                    </span>
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
                  <span
                    className={classes.link}
                    onClick={this.activateStellarGuard}
                  >
                    Activate StellarGuard
                  </span>
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
