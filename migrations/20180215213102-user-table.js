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

exports.up = function(db) {
  return db.createTable('user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    username: { type: 'string', length: 30, unique: true },
    email: { type: 'string', length: 254, unique: true },
    is_email_verified: { type: 'boolean', default: true }
  });
};

exports.down = function(db) {
  return db.dropTable('user', { ifExists: true });
};

exports._meta = {
  version: 1
};
