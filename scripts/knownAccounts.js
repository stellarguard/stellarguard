const axios = require('axios');
const fs = require('fs');

(async function() {
  const response = await axios.get(
    'https://api.stellar.expert/explorer/public/directory'
  );
  const knownAccounts = {};
  response.data._embedded.records.forEach(({ address, name, accepts }) => {
    const account = { name };
    if (accepts && accepts.memo) {
      account.requiredMemoType = accepts.memo;
    }
    knownAccounts[address] = account;
  });

  fs.writeFileSync(
    './src/ui/knownAccounts.json',
    JSON.stringify(knownAccounts)
  );
})();

process.on('unhandledRejection', e => {
  console.error(e);
  process.exit(1);
});
