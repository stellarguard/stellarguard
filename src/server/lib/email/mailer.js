const sgMail = require('@sendgrid/mail');
const config = require('../../config');
sgMail.setApiKey(config.sendGridApiKey);

class Mailer {
  async sendEmail(email) {
    const { to, from, subject, text, html } = email;
    const msg = {
      to,
      from,
      subject,
      text,
      html
    };
    return await sgMail.send(msg);
  }
}

module.exports = new Mailer();
