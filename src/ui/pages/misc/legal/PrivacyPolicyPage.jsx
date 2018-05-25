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
            Last updated <strong>May 24, 2018</strong>
          </Typography>
          <Typography paragraph>
            Thank you for choosing to be part of our community at StellarGuard
            LLC (“company”, “we”, “us”, or “our”). We are committed to
            protecting your personal information and your right to privacy. If
            you have any questions or concerns about our policy, or our
            practices with regards to your personal information, please contact
            us at info@stellarguard.me.
          </Typography>
          <Typography paragraph>
            When you visit our website https://stellarguard.me, and use our
            services, you trust us with your personal information. We take your
            privacy very seriously. In this privacy notice, we describe our
            privacy policy. We seek to explain to you in the clearest way
            possible what information we collect, how we use it and what rights
            you have in relation to it. We hope you take some time to read
            through it carefully, as it is important. If there are any terms in
            this privacy policy that you do not agree with, please discontinue
            use of our Sites and our services.
          </Typography>
          <Typography paragraph>
            This privacy policy applies to all information collected through our
            website (such as https://stellarguard.me), and/or any related
            services, sales, marketing or events (we refer to them collectively
            in this privacy policy as the "Sites").
          </Typography>
          <Typography paragraph>
            <strong>
              Please read this privacy policy carefully as it will help you make
              informed decisions about sharing your personal information with
              us.
            </strong>
          </Typography>
          <Typography variant="title" gutterBottom>
            TABLE OF CONTENTS
          </Typography>
          <Typography paragraph>
            <ol>
              <li>
                <a href="#section-1">WHAT INFORMATION DO WE COLLECT?</a>
              </li>
              <li>
                <a href="#section-2">HOW DO WE USE YOUR INFORMATION?</a>
              </li>
              <li>
                <a href="#section-3">
                  WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                </a>
              </li>
              <li>
                <a href="#section-4">
                  DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </a>
              </li>
              <li>
                <a href="#section-5">HOW LONG DO WE KEEP YOUR INFORMATION?</a>
              </li>
              <li>
                <a href="#section-6">HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
              </li>
              <li>
                <a href="#section-7">DO WE COLLECT INFORMATION FROM MINORS?</a>
              </li>
              <li>
                <a href="#section-8">WHAT ARE YOUR PRIVACY RIGHTS?</a>
              </li>
              <li>
                <a href="#section-9">
                  DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </a>
              </li>
              <li>
                <a href="#section-10">DO WE MAKE UPDATES TO THIS POLICY?</a>
              </li>
              <li>
                <a href="#section-11">
                  HOW CAN YOU CONTACT US ABOUT THIS POLICY?
                </a>
              </li>
            </ol>
          </Typography>
          <Typography id="section-1" variant="title" gutterBottom>
            1. WHAT INFORMATION DO WE COLLECT?
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Personal information you disclose to us
          </Typography>
          <Typography paragraph>
            <b>In Short:</b> We collect personal information that you provide to
            us such as email address, passwords, and Stellar Public Keys.
          </Typography>
          <Typography paragraph>
            We collect personal information that you voluntarily provide to us
            when registering at the Sites expressing an interest in obtaining
            information about us or our products and services, when
            participating in activities on the Sites or otherwise contacting us.
          </Typography>
          <Typography paragraph>
            The personal information that we collect depends on the context of
            your interactions with us and the Sites, the choices you make and
            the products and features you use. The personal information we
            collect can include the following:
          </Typography>
          <Typography paragraph>
            <strong>Contact Data.</strong> We collect your email address.
          </Typography>
          <Typography paragraph>
            <strong>Credentials.</strong> We collect passwords, password hints,
            and similar security information used for authentication and account
            access.
          </Typography>
          <Typography paragraph>
            <strong>Stellar Account Information.</strong> We collect your
            Stellar Public Key that is protected with StellarGuard.
          </Typography>
          <Typography paragraph>
            <strong>Stellar Transactions.</strong> We collect your Stellar
            Transactions that you submit for authorization.
          </Typography>
          <Typography paragraph>
            All personal information that you provide to us must be true,
            complete and accurate, and you must notify us of any changes to such
            personal information.
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Information automatically collected
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> Some information – such as IP address
            and/or browser and device characteristics – is collected
            automatically when you visit our Sites.
          </Typography>
          <Typography paragraph>
            We automatically collect certain information when you visit, use or
            navigate the Sites. This information does not reveal your specific
            identity (like your name or contact information) but may include
            device and usage information, such as your IP address, browser and
            device characteristics, operating system, language preferences,
            referring URLs, device name, country, location, information about
            how and when you use our Sites and other technical information. This
            information is primarily needed to maintain the security and
            operation of our Sites, and for our internal analytics and reporting
            purposes.
          </Typography>
          <Typography paragraph>
            Like many businesses, we also collect information through cookies
            and similar technologies.
          </Typography>
          <Typography id="section-2" variant="title" gutterBottom>
            2. HOW DO WE USE YOUR INFORMATION?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We process your information for purposes
            based on legitimate business interests, the fulfillment of our
            contract with you, compliance with our legal obligations, and/or
            your consent.
          </Typography>
          <Typography paragraph>
            We use personal information collected via our Sites for a variety of
            business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests ("Business Purposes"), in order to enter into or
            perform a contract with you ("Contractual"), with your consent
            ("Consent"), and/or for compliance with our legal obligations
            ("Legal Reasons"). We indicate the specific processing grounds we
            rely on next to each purpose listed below.
          </Typography>
          <Typography gutterBottom>
            We use the information we collect or receive:
          </Typography>
          <Typography paragraph>
            ●{' '}
            <strong>
              To facilitate account creation and logon process with your
              Consent.
            </strong>{' '}
            If you choose to link your account with us to a third party account
            *(such as your Google or Facebook account), we use the information
            you allowed us to collect from those third parties to facilitate
            account creation and logon process. See the section below headed
            "HOW DO WE HANDLE YOUR SOCIAL LOGINS" for further information.
          </Typography>
          <Typography id="section-3" variant="title" gutterBottom>
            3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We only share information with your
            consent, to comply with laws, to protect your rights, or to fulfill
            business obligations.
          </Typography>
          <Typography gutterBottom>
            We only share and disclose your information in the following
            situations:
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Compliance with Laws.
          </Typography>
          <Typography paragraph>
            We may disclose your information where we are legally required to do
            so in order to comply with applicable law, governmental requests, a
            judicial proceeding, court order, or legal process, such as in
            response to a court order or a subpoena (including in response to
            public authorities to meet national security or law enforcement
            requirements).
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Vital Interests and Legal Rights.
          </Typography>
          <Typography paragraph>
            We may disclose your information where we believe it is necessary to
            investigate, prevent, or take action regarding potential violations
            of our policies, suspected fraud, situations involving potential
            threats to the safety of any person and illegal activities, or as
            evidence in litigation in which we are involved.
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Business Transfers.
          </Typography>
          <Typography paragraph>
            We may share or transfer your information in connection with, or
            during negotiations of, any merger, sale of company assets,
            financing, or acquisition of all or a portion of our business to
            another company.
          </Typography>
          <Typography variant="subheading" gutterBottom>
            With your Consent.
          </Typography>
          <Typography paragraph>
            We may disclose your personal information for any other purpose with
            your consent.
          </Typography>

          <Typography id="section-4" variant="title" gutterBottom>
            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We may use cookies and other tracking
            technologies to collect and store your information.
          </Typography>
          <Typography paragraph>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information.
          </Typography>
          <Typography id="section-5" variant="title" gutterBottom>
            5. HOW LONG DO WE KEEP YOUR INFORMATION?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We keep your information for as long as
            necessary to fulfill the purposes outlined in this privacy policy
            unless otherwise required by law.
          </Typography>
          <Typography paragraph>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy policy, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting or other legal requirements). No purpose in this
            policy will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
          </Typography>
          <Typography paragraph>
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize it, or, if
            this is not possible (for example, because your personal information
            has been stored in backup archives), then we will securely store
            your personal information and isolate it from any further processing
            until deletion is possible.
          </Typography>
          <Typography id="section-6" variant="title" gutterBottom>
            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We aim to protect your personal
            information through a system of organizational and technical
            security measures.
          </Typography>
          <Typography paragraph>
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, please also remember that we cannot
            guarantee that the internet itself is 100% secure. Although we will
            do our best to protect your personal information, transmission of
            personal information to and from our Sites is at your own risk. You
            should only access the services within a secure environment.
          </Typography>
          <Typography id="section-7" variant="title" gutterBottom>
            7. DO WE COLLECT INFORMATION FROM MINORS?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We do not knowingly collect data from or
            market to children under 18 years of age.
          </Typography>
          <Typography paragraph>
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Sites, you represent that you are at
            least 18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent’s use of the Sites. If we learn that
            personal information from users less than 18 years of age has been
            collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we have collected from children under age
            18, please contact us at support@stellarguard.me.
          </Typography>
          <Typography id="section-8" variant="title" gutterBottom>
            8. WHAT ARE YOUR PRIVACY RIGHTS?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> In some regions, such as the European
            Economic Area, you have rights that allow you greater access to and
            control over your personal information. You may review, change, or
            terminate your account at any time.
          </Typography>
          <Typography paragraph>
            In some regions (like the European Economic Area), you have certain
            rights under applicable data protection laws. These may include the
            right (i) to request access and obtain a copy of your personal
            information, (ii) to request rectification or erasure; (iii) to
            restrict the processing of your personal information; and (iv) if
            applicable, to data portability. In certain circumstances, you may
            also have the right to object to the processing of your personal
            information. To make such a request, please use the contact details
            provided below. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </Typography>

          <Typography paragraph>
            If we are relying on your consent to process your personal
            information, you have the right to withdraw your consent at any
            time. Please note however that this will not affect the lawfulness
            of the processing before its withdrawal.
          </Typography>

          <Typography paragraph>
            If you are resident in the European Economic Area and you believe we
            are unlawfully processing your personal information, you also have
            the right to complain to your local data protection supervisory
            authority. You can find their contact details here:
            http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Account Information
          </Typography>
          <Typography paragraph>
            If you would at any time like to review or change the information in
            your account or terminate your account, you can contact us at
            support@stellarguard.me
          </Typography>
          <Typography paragraph>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, some information may be retained in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our Terms of Use and/or comply with legal requirements. We
            may ask for additional information from you to verify that you are
            the lawful owner of the account.
          </Typography>
          <Typography id="section-9" variant="title" gutterBottom>
            9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> Yes, if you are a resident of California,
            you are granted specific rights regarding access to your personal
            information.
          </Typography>
          <Typography paragraph>
            California Civil Code Section 1798.83, also known as the “Shine The
            Light” law, permits our users who are California residents to
            request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the
            names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact
            information provided below.
          </Typography>
          <Typography paragraph>
            If you are under 18 years of age, reside in California, and have a
            registered account with the Sites, you have the right to request
            removal of unwanted data that you publicly post on the Sites. To
            request removal of such data, please contact us using the contact
            information provided below, and include the email address associated
            with your account and a statement that you reside in California. We
            will make sure the data is not publicly displayed on the Sites, but
            please be aware that the data may not be completely or
            comprehensively removed from our systems.
          </Typography>
          <Typography id="section-10" variant="title" gutterBottom>
            10. DO WE MAKE UPDATES TO THIS POLICY?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> Yes, we will update this policy as
            necessary to stay compliant with relevant laws.
          </Typography>
          <Typography paragraph>
            We may update this privacy policy from time to time. The updated
            version will be indicated by an updated “Revised” date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy policy, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy policy frequently to be informed of how we are protecting
            your information.
          </Typography>
          <Typography id="section-10" variant="title" gutterBottom>
            11. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
          </Typography>
          <Typography paragraph>
            If you have questions or comments about this policy, you may email
            us at support@stellarguard.me
          </Typography>
        </div>
        <DashboardFab />
      </Page>
    );
  }
}

export default PrivacyPolicyPage;
