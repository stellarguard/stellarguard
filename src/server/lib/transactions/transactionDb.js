const db = require('../db');

const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { DuplicateTransactionError } = require('errors/transaction');

class TransactionDb {
  constructor({ db }) {
    this.db = db;
  }

  async getById(id) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM "transaction" WHERE id = $1',
      [id]
    );

    return rows[0];
  }

  async getByUserId(userId, { status }) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM "transaction" WHERE user_id = $1 AND status = $2',
      [userId, status]
    );

    return rows;
  }

  async create({
    userId,
    xdr,
    ipAddress,
    hash,
    submittedFrom,
    externalId,
    callback
  }) {
    try {
      if (externalId) {
        const { rows } = await this.db.pg.query(
          `
          INSERT INTO "transaction" (user_id, xdr, ip_address, hash, submitted_from, external_id, callback)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *
          `,
          [userId, xdr, ipAddress, hash, submittedFrom, externalId, callback]
        );
        return rows[0];
      } else {
        const { rows } = await this.db.pg.query(
          `
          INSERT INTO "transaction" (user_id, xdr, ip_address, hash, submitted_from, callback)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
          `,
          [userId, xdr, ipAddress, hash, submittedFrom, callback]
        );
        return rows[0];
      }
    } catch (e) {
      switch (e.code) {
        case UNIQUE_VIOLATION:
          throw new DuplicateTransactionError();
        default:
          throw e;
      }
    }
  }

  async updateStatus({ id, status, result }) {
    const { rows } = await this.db.pg.query(
      `UPDATE "transaction"
       SET status = $2, result = $3
       WHERE id = $1
       RETURNING *`,
      [id, status, result]
    );
    return rows[0];
  }

  async getByExternalId({ externalId, submittedFrom }) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM "transaction" WHERE external_id = $1 AND submitted_from = $2',
      [externalId, submittedFrom]
    );

    return rows[0];
  }
}

module.exports = new TransactionDb({ db });
