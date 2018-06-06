'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  const rows = await db.all(
    `SELECT * from "user" WHERE encrypted_signer_secret_key IS NULL`
  );

  for (const row of rows) {
    var { crypto } = require('../src/server/lib/utils');
    const encryptedSignerSecretKey = await crypto.encrypt(
      row.signer_secret_key
    );

    await db.runSql(
      `UPDATE "user"
       SET encrypted_signer_secret_key = ?
       WHERE id = ?
      `,
      [encryptedSignerSecretKey, row.id]
    );
  }
};

exports.down = async function(db) {};

exports._meta = {
  version: 1
};
