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

const TABLE = 'authenticator';

exports.up = async function(db) {
  return await db.createTable(TABLE, {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: {
      type: 'int',
      notNull: true,
      unique: true,
      foreignKey: {
        name: 'authenticator_user_id_fk',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    secret: { type: 'string', notNull: true }
  });
};

exports.down = function(db) {
  return db.dropTable(TABLE, { ifExists: true });
};

exports._meta = {
  version: 1
};
