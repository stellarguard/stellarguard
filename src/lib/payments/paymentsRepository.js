const StellarPayment = require('./StellarPayment');

class PaymentsRepository {
  constructor() {
    this.paymentsDb = require('./paymentsDb');
  }

  async create(payment) {
    const id = this.paymentsDb.create(JSON.parse(JSON.stringify(payment)));
    payment.id = id;
    return new StellarPayment(payment);
  }

  async getLastPayment() {
    return Object.values(this.paymentsDb.db.data.id)
      .sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        }

        if (a.createdAt == b.createdAt) {
          return 0;
        }

        if (a.createdAt > b.createdAt) {
          return 1;
        }
      })
      .reverse()
      .map(payment => new StellarPayment(payment))[0];
  }

  async getByMemo(memo) {
    return Object.values(this.paymentsDb.db.data.id)
      .map(paymentDto => new StellarPayment(paymentDto))
      .filter(payment => payment.memo === memo);
  }
}

module.exports = new PaymentsRepository();
