class StellarAccount {
  constructor({ id, userId, publicKey }) {
    this.id = id;
    this.userId = userId;
    this.publicKey = publicKey;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      publicKey: this.publicKey
    };
  }
}

module.exports = StellarAccount;
