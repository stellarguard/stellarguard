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
  const sql = `
  ALTER TABLE "transaction" DROP CONSTRAINT transaction_pkey;
  ALTER TABLE "transaction" RENAME COLUMN id TO id_old;
  ALTER TABLE "transaction" RENAME COLUMN uid TO id;
  ALTER TABLE "transaction" ADD PRIMARY KEY (id);
  `;
  return await db.runSql(sql);
};

exports.down = async function(db) {
  const sql = `
  ALTER TABLE "transaction" DROP CONSTRAINT transaction_pkey;
  ALTER TABLE "transaction" RENAME COLUMN id TO uid;
  ALTER TABLE "transaction" RENAME COLUMN id_old TO id;
  ALTER TABLE "transaction" ADD PRIMARY KEY (id);
  `;

  return await db.runSql(sql);
};

exports._meta = {
  version: 1
};
