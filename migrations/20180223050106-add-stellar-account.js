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

const TABLE = 'stellar_account';

exports.up = async function(db) {
  await db.createTable(TABLE, {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'stellar_account_user_id_fk',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    public_key: { type: 'string', length: 56, unique: true, notNull: true }
  });

  return await db.addIndex(TABLE, 'index_stellar_account_user_id', ['user_id']);
};

exports.down = function(db) {
  return db.dropTable(TABLE, { ifExists: true });
};

exports._meta = {
  version: 1
};
