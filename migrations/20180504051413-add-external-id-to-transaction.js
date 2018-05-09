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

const TABLE = 'transaction';
const COLUMN = 'external_id';

exports.up = async function(db) {
  await db.addColumn(TABLE, COLUMN, {
    type: 'string'
  });
};

exports.down = async function(db) {
  await db.removeColumn(TABLE, COLUMN);
};

exports._meta = {
  version: 1
};
