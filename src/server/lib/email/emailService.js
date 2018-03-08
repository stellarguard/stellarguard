const mailer = require('./mailer');
const { Welcome, AuthorizeTransaction, ResetPassword } = require('./emails');

class EmailService {
  async sendWelcomeEmail({ user }) {
    const email = new Welcome({ user });
    return await mailer.sendEmail(email);
  }

  async sendTransactionAuthorizationEmail({ user, transaction }) {
    const email = new AuthorizeTransaction({ user, transaction });
    return await mailer.sendEmail(email);
  }

  async sendResetPasswordEmail({ user, code }) {
    const email = new ResetPassword({ user, code });
    return await mailer.sendEmail(email);
  }
}

module.exports = new EmailService();
