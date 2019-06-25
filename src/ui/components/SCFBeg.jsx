import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core';
import Snackbar from './Snackbar';
import ExternalLink from './ExternalLink';
import { inject, observer } from 'mobx-react';
import ButtonLink from './ButtonLink';

const styles = () => ({
  link: {
    marginLeft: 2
  },
  takeMeThere: {
    marginRight: 8
  }
});

const SCF_FINALS_LINK =
  'https://new.reddit.com/r/Stellar/comments/c4wdw1/stellar_community_fund_round_1_final_voting/';

@withStyles(styles)
@inject('rootStore')
@observer
class SCFBeg extends Component {
  close = () => {
    this.props.rootStore.uiState.closeScfBeg();
  };

  render() {
    const { classes, rootStore } = this.props;
    const open = rootStore.uiState.shouldShowScfBeg;

    return (
      <Snackbar
        open={!!open}
        onClose={this.close}
        modal={true}
        action={
          <div>
            <ButtonLink
              className={classes.takeMeThere}
              variant="outlined"
              color="inherit"
              to={SCF_FINALS_LINK}
              onClick={this.close}
              component={ExternalLink}
            >
              Take me there
            </ButtonLink>
            <Button color="inherit" onClick={this.close}>
              No thanks
            </Button>
          </div>
        }
      >
        Hey there! StellarGuard is a finalist in the{' '}
        <ExternalLink
          className={classes.link}
          to={SCF_FINALS_LINK}
          onClick={this.close}
        >
          Stellar Community Fund.
        </ExternalLink>{' '}
        Please considering taking a moment to show your support by voting for
        us.
      </Snackbar>
    );
  }
}

export default withStyles(styles)(SCFBeg);
