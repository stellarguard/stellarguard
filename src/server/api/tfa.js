const express = require('express');
const router = express.Router();

const session = require('../session');
const { tfa } = require('../lib');
const Controller = require('./Controller');

class TfaController extends Controller {
  async generateAuthenticatorSecret(req, res) {
    const secret = await tfa.authenticatorService.generateSecret(req.user);
    return res.json(secret);
  }

  async enableAuthenticator(req, res) {
    const { secret, verificationCode } = req.body;
    const secrets = await tfa.authenticatorService.enableAuthenticator(
      req.user,
      {
        secret,
        verificationCode
      }
    );
    res.json(secrets);
  }

  async removeAuthenticator(req, res) {
    const { verificationCode } = req.query;
    await tfa.authenticatorService.removeAuthenticator(req.user, {
      verificationCode
    });
    res.json({});
  }
}

const controller = new TfaController();

router.use(session.csrf);
router.use(session.ensureLoggedIn());
router.post('/authenticator/secret', controller.generateAuthenticatorSecret);
router.post('/authenticator', controller.enableAuthenticator);
router.delete('/authenticator', controller.removeAuthenticator);

module.exports = router;
