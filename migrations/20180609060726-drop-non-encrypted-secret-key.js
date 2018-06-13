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
const COLUMN = 'signer_secret_key_to_delete';

exports.up = async function(db) {
  await db.removeColumn(TABLE, COLUMN);
};

exports.down = async function(db) {
  return await db.addColumn(TABLE, COLUMN, {
    type: 'text'
  });
};

exports._meta = {
  version: 1
};
