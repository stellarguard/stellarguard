const crypto = require('crypto');
const Cryptr = require('cryptr');
const config = require('../../config');

/**
 *
 * @param {string|number} data The data to get an hmac from.
 * @param {number} [length] The number of characters to get from the back of the string.
 */
function getHmac(data, length = 0) {
  if (!data) {
    throw { error: `"data" is required.` };
  }

  const hmac = crypto
    .createHmac('sha256', config.hmacSecret)
    .update(String(data))
    .digest('hex');

  return hmac.slice(-length);
}

let encrypt = encryptLocal;
let decrypt = decryptLocal;
if (config.useGoogleKms) {
  const googleKms = require('./googleKms');
  encrypt = googleKms.encrypt;
  decrypt = googleKms.decrypt;
}

const cryptr = new Cryptr(config.cryptoSecret, 'aes256');
async function encryptLocal(text) {
  return cryptr.encrypt(text);
}

async function decryptLocal(text) {
  return cryptr.decrypt(text);
}

module.exports = {
  getHmac,
  encrypt,
  decrypt
};
