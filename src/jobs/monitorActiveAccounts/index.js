// Job Purpose: To monitor all accounts registered with the system
// and check whether they have it as a signer
// if not, deactivate it
const Job = require('../Job');
const map = require('lodash.map');
const { accounts, utils, stellar } = require('../../lib');
const config = require('../../config');

class MonitorActiveAccounts extends Job {
  async run() {
    let cursor = new utils.Cursor();

    do {
      const result = await accounts.accountsService.getAccounts({
        cursor,
        limit: 10
      });

      const allAccounts = result.accounts;

      const stellarAccounts = await stellar.accounts.getAccounts(
        map(allAccounts, 'publicKey')
      );

      await Promise.all(
        allAccounts.map((account, i) => {
          const stellarAccount = stellarAccounts[i];
          const hasSigner = doesAccountHaveSigner(
            stellarAccount,
            config.signerPublicKey
          );

          if (hasSigner) {
            return accounts.accountsService.activateAccount(account);
          } else {
            return accounts.accountsService.deactivateAccount(account);
          }
        })
      );
    } while (cursor.hasValue());
  }
}

module.exports = MonitorActiveAccounts;

function doesAccountHaveSigner(account, requiredSigner) {
  return account.signers.some(signer => signer.public_key === requiredSigner);
}
