const nodemailer = require('nodemailer');

class Mailer {
  async sendEmail({ to, from, subject, text, html }) {
    const promise = new Promise((resolve, reject) => {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          return reject(err);
        }
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from,
          to,
          subject,
          text,
          html
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          resolve(info);
        });
      });
    });

    return await promise;
  }
}

module.exports = new Mailer();
