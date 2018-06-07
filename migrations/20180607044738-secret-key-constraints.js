'use strict';

var dbm;
var type;
var seed;

const TABLE = 'user';
const COLUMN_NAME = 'signer_secret_key_to_delete';
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
  return await db.changeColumn(TABLE, COLUMN_NAME, {
    notNull: false
  });
};

exports.down = async function(db) {
  return await db.changeColumn(TABLE, COLUMN_NAME, {
    notNull: true
  });
};

exports._meta = {
  version: 1
};
