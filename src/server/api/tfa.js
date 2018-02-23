const express = require('express');
const router = express.Router();

const session = require('../session');
const { tfa } = require('../lib');
const Controller = require('./Controller');

class TfaController extends Controller {
  async createTfaStrategy(req, res) {
    const { type } = req.body;
    // TODO -- see if we need to sanitize the body at all
    const tfaStrategy = await tfa.tfaStrategyService.createStrategy({
      type,
      userId: req.user.id,
      username: req.user.username
    });
    res.json(tfaStrategy);
  }

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
}

const controller = new TfaController();

router.use(session.ensureLoggedIn());
router.post('/', controller.createTfaStrategy);
router.post('/authenticator/secret', controller.generateAuthenticatorSecret);
router.post('/authenticator', controller.enableAuthenticator);

module.exports = router;
