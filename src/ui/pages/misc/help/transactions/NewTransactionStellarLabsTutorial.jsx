import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography } from '@material-ui/core';

import config from '../../../../config';
import TutorialPage from '../TutorialPage';
import TutorialLine from '../TutorialLine';
import { ExternalLink, Link } from '../../../../components';

import sourceAccountImg from './source_account.png';
import sequenceNumberImg from './sequence_number.png';
import baseFeeImg from './base_fee.png';
import memoImg from './memo.png';
import timeBoundsImg from './time_bounds.png';
import paymentOperationImg from './payment_operation.png';
import destinationImg from './destination.png';
import unsignedTransactionImg from './unsigned_transaction.png';
import signTransactionImg from './sign_transaction.png';
import copyXdrImg from './copy_xdr.png';

const styles = theme => ({});

@withStyles(styles)
@withRouter
@observer
class StellarLabsTransactionsTutorial extends Component {
  get title() {
    return 'New Transaction with Stellar Laboratory';
  }

  get description() {
    return `Learn how to create and submit a new transaction with Stellar Laboratory's transaction builder.`;
  }

  get transactionBuilderUrl() {
    const network = config.isTestNetwork ? 'test' : 'public';
    return `https://www.stellar.org/laboratory/#txbuilder?network=${network}`;
  }

  render() {
    return (
      <TutorialPage title={this.title} description={this.description}>
        <TutorialLine>
          Step 1: Go to{' '}
          <ExternalLink href={this.transactionBuilderUrl}>
            Stellar.org&apos;s Transaction Builder
          </ExternalLink>
        </TutorialLine>
        <TutorialLine imgSrc={sourceAccountImg}>
          Step 2: Enter your the public key of your Stellar account.
        </TutorialLine>
        <TutorialLine imgSrc={sequenceNumberImg}>
          Step 3: Click &quot;Fetch next sequence number for account&quot;
        </TutorialLine>
        <TutorialLine imgSrc={baseFeeImg}>
          Step 4: Leave Base Fee blank.
        </TutorialLine>
        <TutorialLine imgSrc={memoImg}>
          Step 5: Enter an optional memo that is sent with the transaction.
        </TutorialLine>
        <TutorialLine imgSrc={timeBoundsImg}>
          Step 6: Leave Time Bounds blank.
        </TutorialLine>
        <TutorialLine imgSrc={paymentOperationImg}>
          Step 7: Go to Operation type and choose &quot;Payment&quot;. If you
          are making a different type of transaction, choose that here.
        </TutorialLine>
        <TutorialLine imgSrc={destinationImg}>
          Step 8: Enter the Destination address, choose native Asset to send
          XLM, and enter the Amount of XLM to send. Leave Source Account blank.
        </TutorialLine>
        <TutorialLine imgSrc={unsignedTransactionImg}>
          Step 9: Scroll down to see the transaction XDR. It is currently
          unsigned and needs to be signed by your private key in the next step.
          Click &quot;Sign in Transaction Signer&quot;.
        </TutorialLine>
        <TutorialLine imgSrc={signTransactionImg}>
          Step 10: Within the &quot;Signatures&quot; section, enter your private
          key in the &quot;Add Signer&quot; input.
        </TutorialLine>
        <TutorialLine imgSrc={copyXdrImg}>
          Step 11: Click and copy the signed transaction XDR -- this is what you
          will use to submit to StellarGuard.
        </TutorialLine>
        <TutorialLine>
          Step 12: Go back to the{' '}
          <Link to="/transactions/new">New Transaction Page</Link>. Paste the
          signed transaction XDR into the input and click Submit.
        </TutorialLine>
        <TutorialLine>
          Congratulations! You&apos;ve submitted a transaction to StellarGuard.
        </TutorialLine>
      </TutorialPage>
    );
  }
}

export default StellarLabsTransactionsTutorial;
