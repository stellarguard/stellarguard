import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';

import TutorialPage from '../../TutorialPage';
import TutorialLine from '../../TutorialLine';
import { ExternalLink, Link } from '../../../../../components';

import secretKeyImg from './secret_key.png';
import destinationImg from './destination.png';
import amountImg from './amount.png';
import memoImg from './memo.png';
import submitTransactionImg from './submit_transaction.png';
import copyXdrImg from './copy_xdr.png';
import stellarGuardImg from './stellarguard.png';

const styles = theme => ({});

@withStyles(styles)
@withRouter
@observer
class NewTransactionAccountViewerTutorial extends Component {
  get title() {
    return 'New Transaction with Stellar Account Viewer';
  }

  get description() {
    return `Learn how to create and submit a new payment transaction with the Stellar.org Account Viewer.`;
  }

  get url() {
    return `https://www.stellar.org/account-viewer`;
  }

  render() {
    return (
      <TutorialPage title={this.title} description={this.description}>
        <TutorialLine>
          Step 1: Go to the{' '}
          <ExternalLink href={this.url}>
            Stellar.org Account Viewer
          </ExternalLink>
        </TutorialLine>
        <TutorialLine imgSrc={secretKeyImg}>
          Step 2: Enter the Secret Key of your Stellar Account.
        </TutorialLine>
        <TutorialLine imgSrc={destinationImg}>
          Step 3: Enter the Stellar Public Key of your payment destination.
        </TutorialLine>
        <TutorialLine imgSrc={amountImg}>
          Step 4: Enter the amount of lumens to send.
        </TutorialLine>
        <TutorialLine imgSrc={memoImg}>
          Step 5: Add an optional memo by clicking &quot;Add Memo&quot; and
          entering your memo.
        </TutorialLine>
        <TutorialLine imgSrc={submitTransactionImg}>
          Step 6: Click &quot;Send lumens&quot; to be taken to a confirmation
          page. Verify that the payment information is correct and click
          &quote;Submit transaction&quot;.
        </TutorialLine>
        <TutorialLine imgSrc={copyXdrImg}>
          Step 7: Select and copy the transaction XDR listed in the page.
        </TutorialLine>
        <TutorialLine imgSrc={stellarGuardImg}>
          Step 8: Go back to the{' '}
          <Link to="/transactions/new">New Transaction Page</Link>. Paste the
          transaction XDR into the input and click Submit.
        </TutorialLine>
        <TutorialLine>
          Congratulations! You&apos;ve submitted a transaction to StellarGuard.
        </TutorialLine>
      </TutorialPage>
    );
  }
}

export default NewTransactionAccountViewerTutorial;
