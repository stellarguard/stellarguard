const crypto = require('crypto');
const config = require('../../config');

function getHmac(data) {
  if (!data) {
    throw { error: `"data" is required.` };
  }
  return crypto
    .createHmac('sha256', config.hmacSecret)
    .update(String(data))
    .digest('base64');
}

module.exports = {
  getHmac
};
