import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import TutorialPage from '../TutorialPage';
import TutorialLine from '../TutorialLine';
import { ExternalLink } from '../../../../components';

import signIn from './signin.png';
import transaction from './transaction.png';
import confirm from './confirm.png';
import stellarguard from './stellarguard.png';

const styles = theme => ({});

@withStyles(styles)
@withRouter
@observer
class StellarTermTranactionTutorial extends Component {
  get title() {
    return 'Transaction With StellarTerm';
  }

  get description() {
    return `Learn how to submit a transaction with StellarTerm`;
  }

  get url() {
    return `https://stellarterm.com`;
  }

  render() {
    return (
      <TutorialPage title={this.title} description={this.description}>
        <TutorialLine imgSrc={signIn}>
          Step 1: Go to{' '}
          <ExternalLink href={this.url}>stellarterm.com</ExternalLink> and sign
          in with your StellarGuard protected account.
        </TutorialLine>
        <TutorialLine imgSrc={transaction}>
          Step 2: Create a transaction, such as sending XLM or trading a Stellar
          asset. Submit it.
        </TutorialLine>
        <TutorialLine imgSrc={confirm}>
          Step 3: A confirmation dialog will appear to show that your
          transaction was submitted to StellarGuard.
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
          StellarTerm.
        </TutorialLine>
      </TutorialPage>
    );
  }
}

export default StellarTermTranactionTutorial;
