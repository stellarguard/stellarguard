import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { observer } from 'mobx-react';

import { Page, DashboardFab } from '../../../components';

const styles = theme => {
  return {};
};

@withStyles(styles)
@observer
class TermsOfServicePage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Page>
        <Helmet>
          <title>StellarGuard | Terms of Service</title>
        </Helmet>
        <div>
          <Typography variant="headline" gutterBottom>
            Terms of Service
          </Typography>
          <Typography paragraph>Last updated May 02, 2018</Typography>

          <Typography paragraph>
            By using StellarGuard LLC products, software, services or web sites
            you agree to the following terms and conditions.
          </Typography>
          <Typography paragraph>
            The information contained in this website is for general information
            purposes only. The information is provided by StellarGuard LLC and
            while we endeavor to keep the information up to date and correct, we
            make no representations or warranties of any kind, express or
            implied, about the completeness, accuracy, reliability, suitability
            or availability with respect to the website or the information,
            products, services, or related graphics contained on the website for
            any purpose. Any reliance you place on such information is therefore
            strictly at your own risk.
          </Typography>
          <Typography paragraph>
            StellarGuard is a third-party tool used to protect your assets on
            the Stellar network. It is not affiliated or partnered with
            Stellar.org or the Stellar Development Foundation.
          </Typography>
          <Typography variant="title" gutterBottom>
            Risk of Loss
          </Typography>
          <Typography paragraph>
            In no event will we be liable for any loss or damage including
            without limitation, indirect or consequential loss or damage, or any
            loss or damage whatsoever arising from loss of data or profits
            arising out of, or in connection with, the use of any StellarGuard
            LLC products, software, services or web sites.
          </Typography>
          <Typography paragraph>
            Every effort is made to keep the website up and running smoothly.
            However, StellarGuard LLC takes no responsibility for, and will not
            be liable for, the website being temporarily unavailable due to
            technical issues beyond our control.
          </Typography>
          <Typography paragraph>
            StellarGuard LLC takes no responsibility for and will not be liable
            for any financial loss arising from the use of our service including
            but not limited to any of the following.
          </Typography>
          <Typography>
            ● Financial loss due to account information being "Brute-forced".
          </Typography>
          <Typography>
            ● Financial loss due to server failure or data loss.
          </Typography>
          <Typography>
            ● Financial loss due to server hacks or unavailability.
          </Typography>
          <Typography>
            ● Financial loss due to forgotten mnemonics or passwords.
          </Typography>
          <Typography>
            ● Financial loss due to lost or inaccessible two factor
            authentication (2fa) mechanisms.
          </Typography>
          <Typography>
            ● Financial loss due to corrupted data on our servers.
          </Typography>
          <Typography>
            ● Financial loss due to incorrectly constructed transactions.
          </Typography>
          <Typography>
            ● Financial loss due to misconfiguring multisignatures accounts.
          </Typography>
          <Typography>
            ● Financial loss due to StellarGuard ceasing operations.
          </Typography>
          <Typography paragraph>
            ● Financial loss due to "phishing" or other websites masquerading as
            StellarGuard.
          </Typography>
          <Typography variant="title" gutterBottom>
            Ceasing Operations
          </Typography>
          <Typography paragraph>
            StellarGuard LLC reserves the right to cease operations at any time.
            However, StellarGuard LLC will provide account holders 90 days of
            notice of its intent to shut down. This will give users time to
            deactivate the StellarGuard multisignature on their accounts. At
            least 5 days prior to ceasing operations, StellarGuard will email
            the registered email of StellarGuard users that have Stellar
            accounts that are still linked to StellarGuard the private key that
            is used to sign transactions for their account.
          </Typography>
          <Typography paragraph>
            Failure to deactivate your account before StellarGuard ceases
            operations may lead to a loss of your ability to create
            transactions. Users are encouraged to add a backup signer to their
            accounts to be able to continue to sign transactions even without
            StellarGuard.
          </Typography>
          <Typography variant="title" gutterBottom>
            Paid Features
          </Typography>
          <Typography paragraph>
            StellarGuard LLC reserves the right to add paid or premium features
            at any time and features that were at one time free may fall under
            the paid plan in the future.
          </Typography>
        </div>
        <DashboardFab />
      </Page>
    );
  }
}

export default TermsOfServicePage;
