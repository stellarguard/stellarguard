const axios = require('axios');

(async function() {
  const response = await axios.get(
    'https://stellar.expert/api/explorer/public/directory'
  );
  const knownAccounts = {};
  response.data._embedded.records.forEach(({ address, name, accepts }) => {
    const account = { name };
    if (accepts && accepts.memo) {
      account.requiredMemoType = accepts.memo;
    }
    knownAccounts[address] = account;
  });

  console.log(JSON.stringify(knownAccounts, null, 2));
})();
