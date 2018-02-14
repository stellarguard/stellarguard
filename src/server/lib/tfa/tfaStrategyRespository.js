const TfaStrategy = require('./TfaStrategy');
const AuthenticatorStrategy = require('./AuthenticatorStrategy');
const EmailStrategy = require('./EmailStrategy');

class TfaStrategyRepository {
  constructor() {
    const dbs = require('./strategyDbs');
    this.strategyDb = dbs.strategyDb;
    this.authenticatorStrategyDb = dbs.authenticatorStrategyDb;
    this.emailStrategyDb = dbs.emailStrategyDb;
  }

  async getStrategiesForUserId(userId) {
    const baseStrategies = this.strategyDb.get(userId, 'userId');
    const strategies = await Promise.all(
      baseStrategies.map(baseStrategy => this.buildStrategy(baseStrategy))
    );

    return strategies;
  }

  async createStrategy({ userId, type, ...extras }) {
    const id = this.strategyDb.create({ userId, type });
    await this.createStrategySubType(id, type, extras);
    return this.newStrategy({ userId, id, type, ...extras });
  }

  async createStrategySubType(id, type, extras = {}) {
    switch (type) {
      case TfaStrategy.Type.Authenticator:
        return this.authenticatorStrategyDb.create({ id, ...extras });
      case TfaStrategy.Type.Email:
        return this.emailStrategyDb.create({ id, ...extras });
    }
  }

  newStrategy({ userId, id, type, ...extras }) {
    switch (type) {
      case TfaStrategy.Type.Authenticator:
        return new AuthenticatorStrategy({ userId, id, ...extras });
      case TfaStrategy.Type.Email:
        return new EmailStrategy({ userId, id, ...extras });
    }
  }

  async buildStrategy(baseStrategy) {
    switch (baseStrategy.type) {
      case TfaStrategy.Type.Authenticator:
        const authenticatorStrategyData = this.authenticatorStrategyDb.get(
          baseStrategy.id
        );

        return new AuthenticatorStrategy(
          Object.assign(authenticatorStrategyData, baseStrategy)
        );
      case TfaStrategy.Type.Email:
        return new EmailStrategy(baseStrategy);
      default:
        throw new Error(`Strategy of type ${baseStrategy.type} does not exist`);
    }
  }
}

module.exports = new TfaStrategyRepository();
