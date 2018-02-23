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

exports.up = async function(db) {
  await db.createTable('user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: { type: 'string', length: 254, unique: true, notNull: true },
    password_hash: { type: 'string', notNull: true },
    is_email_verified: { type: 'boolean', default: true },
    signer_public_key: { type: 'string', notNull: true },
    signer_secret_key: { type: 'string', notNull: true }
  });

  return await db.addIndex('user', 'index_user_signer_public_key', [
    'signer_public_key'
  ]);
};

exports.down = function(db) {
  return db.dropTable('user', { ifExists: true });
};

exports._meta = {
  version: 1
};
