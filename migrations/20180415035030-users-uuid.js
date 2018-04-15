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
const COLUMN = 'external_id';

exports.up = async function(db) {
  return await db.addColumn(TABLE, COLUMN, {
    type: 'uuid',
    unique: true,
    notNull: true,
    defaultValue: new String('uuid_generate_v4()')
  });
};

exports.down = async function(db) {
  await db.removeColumn(TABLE, COLUMN);
};

exports._meta = {
  version: 1
};
