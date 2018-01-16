const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

async function generateSecret(username) {
  const issuer = 'Stellar Guard';
  const speakeasySecret = speakeasy.generateSecret({
    name: username,
    issuer
  });

  const secret = speakeasySecret.base32;
  const otpAuthUrl = getOtpAuthUrl(username, issuer, secret);
  const qrCode = await generateQrCode(otpAuthUrl);
  return {
    secret,
    qrCode
  };
}

function getOtpAuthUrl(label, issuer, secret) {
  const otpAuthUrlOptions = {
    label: `${encodeURIComponent(issuer)}:${encodeURIComponent(label)}`,
    secret: secret,
    encoding: 'base32',
    issuer
  };

  return speakeasy.otpauthURL(otpAuthUrlOptions);
}

async function generateQrCode(otpAuthUrl) {
  return await qrcode.toDataURL(otpAuthUrl);
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
