import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';
import { Helmet } from 'react-helmet';

import { observer } from 'mobx-react';

import { Page, DashboardFab } from '../../../components';

const styles = theme => {
  return {};
};

@withStyles(styles)
@observer
class PrivacyPolicyPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Page>
        <Helmet>
          <title>StellarGuard | Privacy Policy</title>
        </Helmet>
        <div>
          <Typography variant="headline" gutterBottom>
            PRIVACY POLICY
          </Typography>

          <Typography paragraph>
            Last updated <strong>April 30, 2018</strong>
          </Typography>

          <Typography paragraph>
            StellarGuard LLC (“we” or “us” or “our”) respects the privacy of our
            users (“user” or “you”). This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website https://stellarguard.me including any other media
            form, media channel, mobile website, or mobile application related
            or connected thereto (collectively, the “Site”). Please read this
            Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS
            PRIVACY POLICY, PLEASE DO NOT ACCESS THE SITE.
          </Typography>

          <Typography paragraph>
            We reserve the right to make changes to this Privacy Policy at any
            time and for any reason. We will alert you about any changes by
            updating the “Revised” date of this Privacy Policy. Any changes or
            modifications will be effective immediately upon posting the updated
            Privacy Policy on the Site, and you waive the right to receive
            specific notice of each such change or modification. You are
            encouraged to periodically review this Privacy Policy to stay
            informed of updates. You will be deemed to have been made aware of,
            will be subject to, and will be deemed to have accepted the changes
            in any revised Privacy Policy by your continued use of the Site
            after the date such revised Privacy Policy is posted.
          </Typography>

          <Typography variant="title" gutterBottom>
            COLLECTION OF YOUR INFORMATION
          </Typography>

          <Typography paragraph>
            We may collect information about you in a variety of ways. The
            information we may collect on the Site includes:
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Personal Data
          </Typography>

          <Typography paragraph>
            Personally identifiable information such as your email address that
            you voluntarily give to us when you register with the Site. You are
            under no obligation to provide us with personal information of any
            kind, however your refusal to do so may prevent you from using
            certain features of the Site.
          </Typography>

          <Typography variant="subheading">Derivative Data</Typography>

          <Typography paragraph>
            Information our servers automatically collect when you access the
            Site, such as your IP address, your browser type, your operating
            system, your access times, and the pages you have viewed directly
            before and after accessing the Site.
          </Typography>
          <Typography paragraph>
            This information may be used to help combat fraud and unauthorized
            transactions on your account.
          </Typography>

          <Typography variant="title" gutterBottom>
            USE OF YOUR INFORMATION
          </Typography>

          <Typography gutterBottom>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Site to:
          </Typography>
          <Typography>● Create and manage your account.</Typography>
          <Typography>
            ● Email you to provide you with transaction authorization notices
          </Typography>
          <Typography>● Notify you of updates to the Site.</Typography>
          <Typography paragraph>
            ● Perform other business activities as needed.
          </Typography>

          <Typography variant="title" gutterBottom>
            DISCLOSURE OF YOUR INFORMATION
          </Typography>

          <Typography paragraph>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows:
          </Typography>

          <Typography variant="subheading" gutterBottom>
            By Law or to Protect Rights
          </Typography>

          <Typography paragraph>
            If we believe the release of information about you is necessary to
            respond to legal process, to investigate or remedy potential
            violations of our policies, or to protect the rights, property, and
            safety of others, we may share your information as permitted or
            required by any applicable law, rule, or regulation. This includes
            exchanging information with other entities for fraud protection and
            credit risk reduction.
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Sale or Bankruptcy
          </Typography>

          <Typography paragraph>
            If we reorganize or sell all or a portion of our assets, undergo a
            merger, or are acquired by another entity, we may transfer your
            information to the successor entity. If we go out of business or
            enter bankruptcy, your information would be an asset transferred or
            acquired by a third party. You acknowledge that such transfers may
            occur and that the transferee may decline honor commitments we made
            in this Privacy Policy.
          </Typography>

          <Typography paragraph>
            We are not responsible for the actions of third parties with whom
            you share personal or sensitive data, and we have no authority to
            manage or control third-party solicitations. If you no longer wish
            to receive correspondence, emails or other communications from third
            parties, you are responsible for contacting the third party
            directly.
          </Typography>

          <Typography variant="title" gutterBottom>
            TRACKING TECHNOLOGIES
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Cookies and Web Beacons
          </Typography>

          <Typography paragraph>
            If we may use cookies, web beacons, tracking pixels, and other
            tracking technologies on the Site to help customize the Site and
            improve your experience. When you access the Site, your personal
            information is not collected through the use of tracking technology.
            Most browsers are set to accept cookies by default. You can remove
            or reject cookies, but be aware that such action could affect the
            availability and functionality of the Site. You may not decline web
            beacons. However, they can be rendered ineffective by declining all
            cookies or by modifying your web browser&apos;s settings to notify
            you each time a cookie is tendered, permitting you to accept or
            decline cookies on an individual basis.
          </Typography>

          <Typography variant="title" gutterBottom>
            THIRD-PARTY WEBSITES
          </Typography>

          <Typography paragraph>
            The Site may contain links to third-party websites and applications
            of interest, including advertisements and external services, that
            are not affiliated with us. Once you have used these links to leave
            the Site, any information you provide to these third parties is not
            covered by this Privacy Policy, and we cannot guarantee the safety
            and privacy of your information. Before visiting and providing any
            information to any third-party websites, you should inform yourself
            of the privacy policies and practices (if any) of the third party
            responsible for that website, and should take those steps necessary
            to, in your discretion, protect the privacy of your information. We
            are not responsible for the content or privacy and security
            practices and policies of any third parties, including other sites,
            services or applications that may be linked to or from the Site.
          </Typography>

          <Typography variant="title" gutterBottom>
            SECURITY OF YOUR INFORMATION
          </Typography>

          <Typography paragraph>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse. Any
            information disclosed online is vulnerable to interception and
            misuse by unauthorized parties. Therefore, we cannot guarantee
            complete security if you provide personal information.
          </Typography>

          <Typography variant="title" gutterBottom>
            POLICY FOR CHILDREN
          </Typography>

          <Typography paragraph>
            We do not knowingly solicit information from or market to children
            under the age of 13. If you become aware of any data we have
            collected from children under age 13, please contact us using the
            contact information provided below.
          </Typography>

          <Typography variant="title" gutterBottom>
            OPTIONS REGARDING YOUR INFORMATION
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Account Information
          </Typography>

          <Typography gutterBottom>
            You may at any time review or change the information in your account
            or terminate your account by:
          </Typography>
          <Typography paragraph>
            ● Contacting us at support@stellarguard.me
          </Typography>

          <Typography paragraph>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, some information may be retained in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our Terms of Use and/or comply with legal requirements.
          </Typography>

          <Typography variant="title" gutterBottom>
            CONTACT US
          </Typography>

          <Typography paragraph>
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </Typography>

          <Typography paragraph>
            StellarGuard LLC<br />
            support@stellarguard.me
          </Typography>
        </div>
        <DashboardFab />
      </Page>
    );
  }
}

export default PrivacyPolicyPage;
