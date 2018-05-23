import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';

import TutorialPage from '../TutorialPage';
import TutorialLine from '../TutorialLine';
import { ExternalLink } from '../../../../components';

import loginSecretKeyImg from './login_secret_key.png';
import chooseAssetImg from './choose_asset.png';
import placeBuyImg from './place_buy.png';
import confirmImg from './confirm.png';
import submittedToStellarGuardImg from './submitted_to_stellarguard.png';
import authorizeTransactionImg from './authorize_transaction.png';

const styles = theme => ({});

@withStyles(styles)
@withRouter
@observer
class StellarportTransactionTutorial extends Component {
  get title() {
    return 'New Transaction With Stellarport';
  }

  get description() {
    return `Learn how to trade assets on Stellarport.io with your StellarGuard protected account.`;
  }

  get url() {
    return `https://stellarport.io`;
  }

  render() {
    return (
      <TutorialPage title={this.title} description={this.description}>
        <TutorialLine>
          Step 1: Go to{' '}
          <ExternalLink href={this.url}>Stellarport.io</ExternalLink> and click
          &quot;Sign In&quot;
        </TutorialLine>
        <TutorialLine imgSrc={loginSecretKeyImg}>
          Step 2: Choose &quot;Secret Key&quot; as your login method and enter
          the secret key of your StellarGuard protected account.
        </TutorialLine>
        <TutorialLine imgSrc={chooseAssetImg}>
          Step 3: Click on &quot;Exchange&quot; in the menu bar and then choose
          the asset you would like to trade from the markets list.
        </TutorialLine>
        <TutorialLine imgSrc={placeBuyImg}>
          Step 4: Enter the quantity XLM that you&apos;d like to use to buy the
          asset, and click &quot;Place Buy&quot;.
        </TutorialLine>
        <TutorialLine imgSrc={confirmImg}>
          Step 5: Confirm your offer details and click &quot;Confirm&quot;.
        </TutorialLine>
        <TutorialLine imgSrc={submittedToStellarGuardImg}>
          Step 6: A popup will confirm that it was submitted to StellarGuard.
          Click &quot;Authorize&quot; to be view the transaction in
          StellarGuard.
        </TutorialLine>
        <TutorialLine imgSrc={authorizeTransactionImg}>
          Step 7: Authorize the transaction in StellarGuard and it will be
          submitted to the Stellar network and your new assets will appear in
          Stellarport. Note: the transaction details will include a Manage Offer
          operation as well as a Payment for the Stellarport trading fee.
        </TutorialLine>
        <TutorialLine>
          Congratulations! You&apos;ve learned how to buy an asset on
          Stellarport.
        </TutorialLine>
      </TutorialPage>
    );
  }
}

export default StellarportTransactionTutorial;
