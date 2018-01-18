const express = require('express');
const router = express.Router();

const { stellar, tfa, transactions } = require('../../lib');

router.put('/', async function(req, res, next) {
  try {
    const { xdr } = req.body;
    if (!xdr) {
      return res.json(500, { error: 'xdr is required' });
    }

    const transaction = new transactions.Transaction({ xdr });
    const sourceAccount = transaction.sourceAccount;
    // TODO -- do we allow transactions that haven't been signed yet?
    const tfaStrategy = await tfa.strategies.getForPublicKey(sourceAccount);

    if (!tfaStrategy) {
      return res.status(404).json({
        error:
          'There are no verification methods associated with the source account public key'
      });
    }

    // TODO RENAME SOURCEACCOUNT
    const newTransaction = await transactions.createTransaction(transaction);
    const result = await tfaStrategy.execute(req.body);
    return res.json({ id: newTransaction.id });
  } catch (e) {
    // TODO -- centralize this
    console.error(e);
    return res.status(500).json({ error: 'Unknown' });
  }
});

router.post('/:id/verify', async function(req, res, next) {
  try {
    const { id } = req.params;
    const transaction = await transactions.getTransaction(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ error: 'Transaction could not be found or is expired.' });
    }

    const sourceAccount = transaction.sourceAccount;
    const tfaStrategy = await tfa.strategies.getForPublicKey(sourceAccount);
    const isVerified = await tfaStrategy.verify(req.body);
    if (!isVerified) {
      // increment tries
      return res
        .status(401)
        .json({ error: 'Verification failed. Please try again.' });
    }

    transaction.sign(process.env.SECRET_KEY);
    const result = await transactions.submitTransaction(transaction);
    res.json(result);
  } catch (e) {
    console.error(e.stack);
    console.error(e);
    return res.status(500).json({ error: 'Unknown' });
  }
});

module.exports = router;
