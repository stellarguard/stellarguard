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
  const rows = await db.all(
    `
      SELECT u.id as id, u.is_email_verified, a.id as authenticator
      FROM "user" u
      LEFT JOIN "authenticator" a
      ON u.id = a.user_id
    `
  );

  for (const row of rows) {
    let transactionSecurityLevel = 'none';
    if (row.is_email_verified) {
      transactionSecurityLevel = 'email';
    }

    if (row.authenticator) {
      transactionSecurityLevel = 'authenticator';
    }

    await db.runSql(
      `UPDATE "user"
       SET transaction_security_level = ?
       WHERE id = ?
      `,
      [transactionSecurityLevel, row.id]
    );
  }

  await db.changeColumn('user', 'transaction_security_level', {
    notNull: true
  });
};

exports.down = async function(db) {};

exports._meta = {
  version: 1
};
