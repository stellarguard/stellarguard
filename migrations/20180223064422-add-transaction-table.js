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
  await db.createTable(TABLE, {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'transaction_user_id_fk',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    xdr: { type: 'text', notNull: true },
    status: { type: 'int', notNull: true, defaultValue: 1 },
    result: { type: 'string' },
    ip_address: {
      type: 'string'
    },
    date_created: {
      type: 'datetime',
      notNull: true,
      defaultValue: new String('current_timestamp')
    }
  });

  return await db.addIndex(TABLE, 'index_transaction_user_id', ['user_id']);
};

exports.down = function(db) {
  return db.dropTable(TABLE, { ifExists: true });
};

exports._meta = {
  version: 1
};
