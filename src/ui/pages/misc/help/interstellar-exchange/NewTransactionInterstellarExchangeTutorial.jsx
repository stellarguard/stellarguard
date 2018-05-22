import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';

import TutorialPage from '../TutorialPage';
import TutorialLine from '../TutorialLine';
import { ExternalLink } from '../../../../components';

import importWalletImg from './import_wallet.png';
import addAccountImg from './add_account.png';
import tradeTabImg from './trade_tab.png';
import searchMobiImg from './search_mobi.png';
import trustMobiImg from './trust_mobi.png';
import multisigNotificationImg from './multisig_notification.png';
import pendingForAccountImg from './pending_for_account.png';
import createTrustlineApproveImg from './create_trustline_approve.png';
import authorizeChangeTrustImg from './authorize_change_trust.png';
import buyMobiImg from './buy_mobi.png';
import approveCreateOfferImg from './approve_create_offer.png';
import authorizeManageOfferImg from './authorize_manage_offer.png';

const styles = theme => ({});

@withStyles(styles)
@withRouter
@observer
class NewTransactionInterstellarExchangeTutorial extends Component {
  get title() {
    return 'New Transaction With Interstellar.Exchange';
  }

  get description() {
    return `Learn how to trade assets on Interstellar.Exchange with your StellarGuard protected account.`;
  }

  get url() {
    return `https://interstellar.exchange`;
  }

  render() {
    return (
      <TutorialPage title={this.title} description={this.description}>
        <TutorialLine>
          Step 1: Go to{' '}
          <ExternalLink href={this.url}>InterStellar.Exchange</ExternalLink> and
          click and click &quot;Enter Account&quot;
        </TutorialLine>
        <TutorialLine imgSrc={importWalletImg}>
          Step 2: Set a new password for your account and click
          &quot;Import&quot; to use your existing wallet.
        </TutorialLine>
        <TutorialLine imgSrc={addAccountImg}>
          Step 3: Enter your StellarGuard-protected secret key to add your
          account to make trades on Interstellar.Exchange.
        </TutorialLine>
        <TutorialLine imgSrc={tradeTabImg}>
          Step 4: Click on the Trade tab on the bottom.
        </TutorialLine>
        <TutorialLine imgSrc={searchMobiImg}>
          Step 5: Search for the asset code that you want to trade, and click on
          it.
        </TutorialLine>
        <TutorialLine imgSrc={trustMobiImg}>
          Step 6: If this is your first time trading that asset, you will need
          to add the trustline to your account. Click on &quot;Trust
          Asset&quot;.
        </TutorialLine>
        <TutorialLine imgSrc={multisigNotificationImg}>
          Step 7: A red number will show in the top right, indicating that you
          have pending multisig transactions to approve. Click on it.
        </TutorialLine>
        <TutorialLine imgSrc={pendingForAccountImg}>
          Step 8: Click on your account to see its pending transactions.
        </TutorialLine>
        <TutorialLine imgSrc={createTrustlineApproveImg}>
          Step 9: You will need to approve it from Interstellar before it will
          be submitted to StellarGuard. Click &quot;Approve&quot;. You will then
          receive a new transaction notification from StellarGuard.
        </TutorialLine>
        <TutorialLine imgSrc={authorizeChangeTrustImg}>
          Step 10: Back at StellarGuard, authorize the Change Trust transaction
          by entering your email or two factor auth code.
        </TutorialLine>
        <TutorialLine imgSrc={buyMobiImg}>
          Step 11: Back on Interstellar.Exchange you can now make an offer for
          your asset of choice.
        </TutorialLine>
        <TutorialLine imgSrc={approveCreateOfferImg}>
          Step 12: Approve your offer on Interstellar.Exchange in the same way
          as before to submit it to StellarGuard.
        </TutorialLine>
        <TutorialLine imgSrc={authorizeManageOfferImg}>
          Step 13: Authorize the Manage Offer transaction in StellarGuard to
          complete the transaction.
        </TutorialLine>
        <TutorialLine>
          Congratulations! You&apos;ve learned how to create a trustline and
          submit an offer on InterStellar.Exchange with StellarGuard.
        </TutorialLine>
      </TutorialPage>
    );
  }
}

export default NewTransactionInterstellarExchangeTutorial;
