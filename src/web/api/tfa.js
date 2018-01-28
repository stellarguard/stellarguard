const express = require('express');
const router = express.Router();

const session = require('../session');
const { tfa } = require('../../lib');

class TfaController {
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
}

const controller = new TfaController();

router.use(session.ensureLoggedIn());
router.post('/', controller.createTfaStrategy);

module.exports = router;
