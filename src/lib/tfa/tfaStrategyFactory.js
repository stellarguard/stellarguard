const AuthenticatorStrategy = require('./AuthenticatorStrategy');
const EmailStrategy = require('./EmailStrategy');
const TfaStrategy = require('./TfaStrategy');

const tfaStrategyRepository = require('./tfaStrategyRespository');

async function getForPublicKey(publicKey) {
  const strategyDto = await tfaStrategyRepository.getStrategyForPublicKey(
    publicKey
  );

  if (!strategyDto) {
    return;
  }

  return buildStrategy(strategyDto);
}

function buildStrategy(strategy) {
  switch (strategy.type) {
    case TfaStrategy.Type.Authenticator:
      return new AuthenticatorStrategy(strategy);
    case TfaStrategy.Type.Email:
      return new EmailStrategy(strategy);
    default:
      throw new Error(`Strategy of type ${strategy.type} does not exist`);
  }
}

module.exports = {
  getForPublicKey
};
