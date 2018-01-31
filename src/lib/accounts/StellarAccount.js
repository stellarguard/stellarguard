class StellarAccount {
  constructor({ id, userId, publicKey, isActive = false }) {
    this.id = id;
    this.userId = userId;
    this.publicKey = publicKey;
    this.isActive = isActive;
  }

  get memoText() {
    return String(this.userId);
  }
}

module.exports = StellarAccount;
