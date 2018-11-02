const db = require('../db');
const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { DuplicatePublicKeyError } = require('errors/account');

class StellarAccountDb {
  constructor({ db }) {
    this.db = db;
  }

  async getById(id) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM stellar_account WHERE id = $1',
      [id]
    );

    return rows[0];
  }

  async getByPublicKey(publicKey) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM stellar_account WHERE public_key = $1',
      [publicKey]
    );

    return rows[0];
  }

  async getByUserId(userId) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM stellar_account WHERE user_id = $1',
      [userId]
    );

    return rows;
  }

  async create({ userId, publicKey }) {
    try {
      const { rows } = await this.db.pg.query(
        `INSERT INTO stellar_account (user_id, public_key)
         VALUES ($1, $2)
         RETURNING *`,
        [userId, publicKey]
      );

      return rows[0];
    } catch (e) {
      switch (e.code) {
        case UNIQUE_VIOLATION:
          throw new DuplicatePublicKeyError();
        default:
          throw e;
      }
    }
  }

  async update({ id, name }) {
    const { rows } = await this.db.pg.query(
      `UPDATE stellar_account
       SET name = $2
       WHERE id = $1
       RETURNING *`,
      [id, name]
    );

    return rows[0];
  }

  async deactivate({ userId, publicKey }) {
    const { count } = await this.db.pg.query(
      `
      DELETE FROM stellar_account
      WHERE user_id = $1 AND public_key = $2`,
      [userId, publicKey]
    );

    return count;
  }
}

module.exports = new StellarAccountDb({ db });
