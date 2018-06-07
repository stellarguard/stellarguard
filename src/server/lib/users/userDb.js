const db = require('../db');
const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { DuplicateEmailError } = require('errors/user');

class UserDb {
  constructor({ db }) {
    this.db = db;
  }

  async getById(id) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM "user" WHERE id = $1',
      [id]
    );

    return rows[0];
  }

  async getByEmail(email) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    return rows[0];
  }

  async create({
    email,
    isEmailVerified,
    passwordHash,
    signerPublicKey,
    encryptedSignerSecretKey,
    encryptedRecoveryPhrase
  }) {
    try {
      const { rows } = await this.db.pg.query(
        `INSERT INTO "user" (email, is_email_verified, password_hash, signer_public_key, 
          encrypted_signer_secret_key, encrypted_recovery_phrase)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          email,
          isEmailVerified,
          passwordHash,
          signerPublicKey,
          encryptedSignerSecretKey,
          encryptedRecoveryPhrase
        ]
      );

      return rows[0];
    } catch (e) {
      switch (e.code) {
        case UNIQUE_VIOLATION:
          throw new DuplicateEmailError();
        default:
          throw e;
      }
    }
  }

  async getBySignerPublicKey(signerPublicKey) {
    const { rows } = await this.db.pg.query(
      `SELECT * from "user" WHERE signer_public_key = $1`,
      [signerPublicKey]
    );

    return rows[0];
  }

  async getByExternalId(externalId) {
    const { rows } = await this.db.pg.query(
      `SELECT * from "user" WHERE external_id = $1`,
      [externalId]
    );

    return rows[0];
  }

  async getByAccountPublicKey(publicKey) {
    const { rows } = await this.db.pg.query(
      `SELECT u.* from "user" u
       JOIN stellar_account s
       ON u.id = s.user_id
       WHERE s.public_key = $1`,
      [publicKey]
    );

    return rows[0];
  }

  async updateIsEmailVerified({ id, isEmailVerified }) {
    const { rows } = await this.db.pg.query(
      `UPDATE "user"
       SET is_email_verified = $2
       WHERE id = $1`,
      [id, isEmailVerified]
    );

    return rows[0];
  }

  async updatePassword({ id, passwordHash }) {
    const { rows } = await this.db.pg.query(
      `UPDATE "user"
       SET password_hash = $2
       WHERE id = $1`,
      [id, passwordHash]
    );

    return rows[0];
  }
}

module.exports = new UserDb({ db });
