const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const ISSUER = 'StellarGuard.me';

async function generateSecret(username) {
  const speakeasySecret = speakeasy.generateSecret({
    name: username,
    issuer: ISSUER,
    length: 16
  });

  const secret = speakeasySecret.base32;
  const qrCode = await generateQrCode(username, secret);
  return {
    secret,
    qrCode
  };
}

async function generateQrCode(username, secret) {
  const otpAuthUrl = getOtpAuthUrl(username, secret);
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
