const axios = require('axios');
const config = require('../../config');
const querystring = require('querystring');

class RecaptchaApi {
  constructor({ secret }) {
    this.axiosClient = axios.create({
      baseURL: `https://www.google.com/recaptcha/api/`,
      timeout: 5000
    });
    this.secret = secret;
  }

  async verify({ token, ipAddress }) {
    const response = await this.axiosClient.post(
      '/siteverify',
      querystring.stringify({
        secret: this.secret,
        response: token,
        remoteip: ipAddress
      })
    );

    return response.data;
  }
}

module.exports = new RecaptchaApi({ secret: config.recaptchaSecret });
