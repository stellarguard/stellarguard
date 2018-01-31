const mailer = require('./mailer');

class EmailService {
  async sendWelcomeEmail({ to, username }) {
    const subject = 'Welcome to StellarGuard';

    const text =
      'In order to approve transactions by email, you must first verify your email address by clicking on this link: <LINK>';
    const html =
      'In order to approve transactions by email, you must first verify your email address by clicking on this link: <a href="#">LINK</a>';
    return await mailer.sendEmail({ to, from: 'noreply@sg.com' });
  }

  async sendTransactionAuthorizationEmail({ to, transactionId }) {
    return await mailer.sendEmail({
      to,
      from: 'verify@sg.com',
      subject: 'WUT WUT IN DA BUTT BUTT' + transactionId,
      text: 'Sup, verify it.',
      html: '<h1>ZOMG!!!</h1>'
    });
  }
}

module.exports = new EmailService();
