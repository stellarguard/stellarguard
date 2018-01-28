class Account {
  constructor({ id, userId, publicKey, isActive = false }) {
    this.id = id;
    this.userId = userId;
    this.publicKey = publicKey;
    this.isActive = isActive;
  }
}

module.exports = Account;
