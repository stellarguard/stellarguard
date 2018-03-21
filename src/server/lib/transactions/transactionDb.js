const db = require('../db');

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

  async create({ userId, xdr, ipAddress }) {
    const { rows } = await this.db.pg.query(
      `INSERT INTO "transaction" (user_id, xdr, ip_address)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, xdr, ipAddress]
    );
    return rows[0];
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
}

module.exports = new TransactionDb({ db });
