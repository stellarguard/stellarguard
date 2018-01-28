const FileDb = require('../FileDb');

const strategyDb = new FileDb('tfa_strategy');
strategyDb.indexOn('userId', { multi: true });

const authenticatorStrategyDb = new FileDb('authenticator_tfa_strategy');
const emailStrategyDb = new FileDb('email_tfa_strategy');

module.exports = {
  strategyDb,
  authenticatorStrategyDb,
  emailStrategyDb
};
