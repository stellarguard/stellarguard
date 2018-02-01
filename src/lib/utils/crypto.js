const crypto = require('crypto');
const config = require('../../config');

function getHmac(data, length) {
  if (!data) {
    throw { error: `"data" is required.` };
  }

  const hmac = crypto
    .createHmac('sha256', config.hmacSecret)
    .update(String(data))
    .digest('hex');

  return hmac.slice(0, length);
}

module.exports = {
  getHmac
};
