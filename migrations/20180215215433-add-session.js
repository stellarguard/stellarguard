'use strict';

const fs = require('fs');
const path = require('path');

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
  const file = path.resolve(
    __dirname,
    '../node_modules/connect-pg-simple/table.sql'
  );
  const sql = fs.readFileSync(file, { encoding: 'utf-8' });
  return db.runSql(sql);
};

exports.down = function(db) {
  return db.dropTable('session');
};

exports._meta = {
  version: 1
};
