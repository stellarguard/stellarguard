import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import TutorialPage from '../TutorialPage';
import TutorialLine from '../TutorialLine';
import { ExternalLink } from '../../../../components';

import transaction from './transaction.jpg';
import confirm from './confirm.jpg';
import stellarguard from './stellarguard.png';

const styles = theme => ({});

@withStyles(styles)
@withRouter
@observer
class LobstrTransactionTutorial extends Component {
  get title() {
    return 'Transaction With Lobstr';
  }

  get description() {
    return `Learn how to submit a transaction with Lobstr`;
  }

  get url() {
    return `https://lobstr.co`;
  }

  render() {
    return (
      <TutorialPage title={this.title} description={this.description}>
        <TutorialLine>
          Step 1: Go to <ExternalLink href={this.url}>lobstr.co</ExternalLink>{' '}
          or open the Lobstr mobile app and sign in with your StellarGuard
          protected account.
          <br />
          Note: StellarGuard is only supported in Lobstr version 3.7.0 and
          above.
        </TutorialLine>
        <TutorialLine imgSrc={transaction}>
          Step 2: Create a transaction, such as sending XLM or buying a Stellar
          asset. Submit it.
        </TutorialLine>
        <TutorialLine imgSrc={confirm}>
          Step 3: A confirmation page will show that your transaction was
          submitted to StellarGuard.
        </TutorialLine>
        <TutorialLine imgSrc={stellarguard}>
          Step 4: Click the StellarGuard transaction link in your email or visit{' '}
          <ExternalLink to="/transactions">
            your pending transactions page
          </ExternalLink>{' '}
          to see your transaction. Authorize the transaction and it will be
          submitted to the Stellar network.
        </TutorialLine>
        <TutorialLine>
          Congratulations! You&apos;ve learned how to submit a transaction using
          Lobstr.
        </TutorialLine>
      </TutorialPage>
    );
  }
}

export default LobstrTransactionTutorial;
