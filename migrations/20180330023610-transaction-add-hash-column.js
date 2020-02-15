'use strict';

var dbm;
var type;
var seed;

var StellarSdk = require('stellar-sdk');
var config = require('../src/server/config');

let networkPassphrase;
if (config.isPublicNetwork) {
  networkPassphrase = StellarSdk.Networks.PUBLIC;
} else {
  networkPassphrase = StellarSdk.Networks.TESTNET;
}

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

const TABLE = 'transaction';
const COLUMN = 'hash';

exports.up = async function(db) {
  const rows = await db.all(`SELECT * from "transaction"`);

  await db.addColumn(TABLE, COLUMN, {
    type: 'string'
  });

  const hashes = new Map();
  for (const row of rows) {
    const transaction = new StellarSdk.Transaction(row.xdr, networkPassphrase);
    let hash = transaction.hash().toString('hex');
    if (hashes.has(hash)) {
      const count = hashes.get(hash) + 1;
      hashes.set(hash, count);
      hash = hash + '-' + count;
    } else {
      hashes.set(hash, 0);
    }

    await db.runSql(
      `UPDATE "transaction"
       SET hash = ?
       WHERE id = ?
      `,
      [hash, row.id]
    );
  }

  return await db.changeColumn(TABLE, COLUMN, {
    type: 'string',
    notNull: true,
    unique: true
  });
};

exports.down = async function(db) {
  await db.removeColumn(TABLE, COLUMN);
};

exports._meta = {
  version: 1
};
