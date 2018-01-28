const tfaStrategyRepository = require('./tfaStrategyRespository');
const TfaStrategy = require('./TfaStrategy');
const AuthenticatorStrategy = require('./AuthenticatorStrategy');
const EmailStrategy = require('./EmailStrategy');
class TfaStrategyService {
  async getStrategiesForUserId(userId) {
    return await tfaStrategyRepository.getStrategiesForUserId(userId);
  }

  async createStrategy({ userId, username, type }) {
    const extras = await this.createExtrasForStrategy({
      userId,
      type,
      username
    });

    return await tfaStrategyRepository.createStrategy({
      userId,
      type,
      ...extras
    });
  }

  async createExtrasForStrategy({ userId, type, username }) {
    switch (type) {
      // TODO --- too many switches, use polymorphism instead
      case TfaStrategy.Type.Authenticator:
        return await AuthenticatorStrategy.getExtras({ username });
      case TfaStrategy.Type.Email:
        return await EmailStrategy.getExtras({});
    }
  }
}

module.exports = new TfaStrategyService();
