const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const ISSUER = 'StellarGuard.me';

async function generateSecret(email) {
  const speakeasySecret = speakeasy.generateSecret({
    name: email,
    issuer: ISSUER,
    length: 16
  });

  const secret = speakeasySecret.base32;
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

function getOtpAuthUrl(label, secret) {
  const otpAuthUrlOptions = {
    label: `${encodeURIComponent(ISSUER)}:${encodeURIComponent(label)}`,
    secret: secret,
    encoding: 'base32',
    ISSUER
  };

  return speakeasy.otpauthURL(otpAuthUrlOptions);
}

function verifyToken(token, secret) {
  return speakeasy.totp.verify({
    secret,
    token,
    encoding: 'base32'
  });
}

module.exports = {
  generateSecret,
  verifyToken
};
