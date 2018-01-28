const paymentsRepository = require('./paymentsRepository');

class StellarPaymentsService {
  async recordPayment(payment) {
    return await paymentsRepository.create(payment);
  }

  async getLastRecordedPayment() {
    return await paymentsRepository.getLastPayment();
  }

  async getByUserId(userId) {
    return await paymentsRepository.getByMemo(userId);
  }
}

module.exports = new StellarPaymentsService();
