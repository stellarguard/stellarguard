class StellarAccount {
  constructor({ id, userId, publicKey, name }) {
    this.id = id;
    this.userId = userId;
    this.publicKey = publicKey;
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      publicKey: this.publicKey,
      name: this.name
    };
  }
}

module.exports = StellarAccount;
