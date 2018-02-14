class StellarPayment {
  constructor({ id, from, to, memo, amount, cursor, createdAt }) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.memo = memo;
    this.amount = amount;
    this.cursor = cursor;
    this.createdAt = new Date(createdAt);
    this.type = 'stellar';
  }
}

module.exports = StellarPayment;
