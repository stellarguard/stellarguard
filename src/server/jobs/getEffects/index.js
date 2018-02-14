const Job = require('../Job');
const { stellar } = require('../lib');

class GetEffectsJob extends Job {
  async run(publicKey) {
    const effects = await stellar.accounts.getEffects(publicKey);
    const signerCreatedRecords = getSignerCreatedRecords(
      effects,
      this.config.signerPublicKey
    );

    const operations = await Promise.all(
      signerCreatedRecords.map(async scr => await scr.operation())
    );
    console.log((await operations[0].transaction()).memo);
  }
}

function getSignerCreatedRecords(effects, publicKey) {
  return effects.records.filter(
    r => r.type === 'signer_created' && r.public_key === publicKey
  );
}

module.exports = GetEffectsJob;
