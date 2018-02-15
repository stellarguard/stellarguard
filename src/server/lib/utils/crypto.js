const crypto = require('crypto');
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

module.exports = {
  getHmac
};
