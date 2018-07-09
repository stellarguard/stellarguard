const otplib = require('otplib');
const qrcode = require('qrcode');

const ISSUER = 'StellarGuard';

async function generateSecret(email) {
  const secret = otplib.authenticator.generateSecret();
  const qrCode = await generateQrCode(email, secret);
  return {
    secret,
    qrCode
  };
}

async function generateQrCode(email, secret) {
  const otpAuthUrl = getOtpAuthUrl(email, secret);
  return await qrcode.toDataURL(otpAuthUrl);
}

function getOtpAuthUrl(email, secret) {
  return otplib.authenticator.keyuri(email, ISSUER, secret);
}

function verifyToken(token, secret) {
  return otplib.authenticator.check(token, secret);
}

module.exports = {
  generateSecret,
  verifyToken
};
