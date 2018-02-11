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

const styles = theme => ({
  numbers: {
    backgroundColor: theme.palette.primary.main
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

@inject('rootStore')
@observer
class SubmitMultiSigToStellar extends Component {
  get stellarTransactionSignerHref() {
    const xdr = this.props.rootStore.uiState.addStellarUiState.xdr;
    const network = 'test';
    return `https://www.stellar.org/laboratory/#txsigner?xdr=${encodeURIComponent(
      xdr
    )}&network=${network}`;
  }

  render() {
    const { classes, children } = this.props;
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
                <a
                  className={classes.link}
                  href={this.stellarTransactionSignerHref}
                  target="_blank"
                  rel="noopener"
                >
                  Click here to sign and submit the transaction at Stellar.org
                </a>
              }
            />
          </ListItem>
          <ListItem>
            <Avatar className={classes.numbers}>2</Avatar>
            <ListItemText primary="After you submit it, click Activate to link it to StellarGuard." />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(SubmitMultiSigToStellar);
