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

const TABLE = 'user';

exports.up = async function(db) {
  await db.addColumn(TABLE, 'encrypted_signer_secret_key', {
    type: 'string'
  });

  await db.addColumn(TABLE, 'encrypted_recovery_phrase', {
    type: 'string'
  });
};

exports.down = async function(db) {
  await db.removeColumn(TABLE, 'encrypted_signer_secret_key');
  await db.removeColumn(TABLE, 'encrypted_recovery_phrase');
};

exports._meta = {
  version: 1
};
