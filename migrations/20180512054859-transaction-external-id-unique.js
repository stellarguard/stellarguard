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

exports.up = async function(db) {
  await db.changeColumn(TABLE, 'external_id', {
    defaultValue: new String('uuid_generate_v4()')
  });

  await db.runSql(`
    UPDATE "transaction"
    SET external_id = uuid_generate_v4()
    WHERE external_id IS NULL
  `);

  await db.changeColumn(TABLE, 'external_id', {
    unique: true,
    notNull: true,
    defaultValue: new String('uuid_generate_v4()')
  });

  return await db.changeColumn(TABLE, 'hash', {
    unique: false
  });
};

exports.down = async function(db) {
  await db.changeColumn(TABLE, 'external_id', {
    unique: false,
    notNull: false,
    defaultValue: null
  });

  return await db.changeColumn(TABLE, 'hash', {
    unique: true
  });
};

exports._meta = {
  version: 1
};
