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
const COLUMN = 'date_created';

exports.up = async function(db) {
  await db.addColumn(TABLE, COLUMN, {
    type: 'datetime',
    defaultValue: new String('current_timestamp')
  });

  return await db.runSql(`
    UPDATE "user"
    SET date_created = current_timestamp
    WHERE date_created IS NULL
  `);
};

exports.down = async function(db) {
  return await db.removeColumn(TABLE, COLUMN);
};

exports._meta = {
  version: 1
};
