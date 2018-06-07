const axios = require('axios');
const config = require('../../config');
const querystring = require('querystring');

class RecaptchaApi {
  constructor({ secret }) {
    this.axiosClient = axios.create({
      baseURL: `https://www.google.com/recaptcha/api/`
    });
    this.secret = secret;
  }

  async verify({ token, ipAddress }) {
    console.log({
      secret: this.secret,
      response: token,
      remoteip: ipAddress
    });
    const response = await this.axiosClient.post(
      '/siteverify',
      querystring.stringify({
        secret: this.secret,
        response: token,
        remoteip: ipAddress
      })
    );
    console.log(response);
    return response.data;
  }
}

module.exports = new RecaptchaApi({ secret: config.recaptchaSecret });
