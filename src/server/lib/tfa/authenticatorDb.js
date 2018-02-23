const db = require('../db');
const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { AuthenticatorAlreadyActiveError } = require('errors/authenticator');

class AuthenticatorDb {
  constructor({ db }) {
    this.db = db;
  }

  async getByUserId(userId) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM authenticator WHERE user_id = $1',
      [userId]
    );

    return rows[0];
  }

  async create({ userId, secret }) {
    try {
      const { rows } = await this.db.pg.query(
        `INSERT INTO authenticator (user_id, secret)
         VALUES ($1, $2)
         RETURNING *`,
        [userId, secret]
      );

      return rows[0];
    } catch (e) {
      switch (e.code) {
        case UNIQUE_VIOLATION:
          throw new AuthenticatorAlreadyActiveError();
        default:
          throw e;
      }
    }
  }
}

module.exports = new AuthenticatorDb({ db });
