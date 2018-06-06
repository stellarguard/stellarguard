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
const OLD_COLUMN_NAME = 'signer_secret_key';
const NEW_COLUMN_NAME = 'signer_secret_key_to_delete';

exports.up = async function(db) {
  return await db.renameColumn(TABLE, OLD_COLUMN_NAME, NEW_COLUMN_NAME);
};

exports.down = async function(db) {
  return await db.renameColumn(TABLE, NEW_COLUMN_NAME, OLD_COLUMN_NAME);
};

exports._meta = {
  version: 1
};
