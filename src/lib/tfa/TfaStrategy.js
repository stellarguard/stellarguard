class TfaStrategy {
  constructor({ type }) {
    this.type = type;
  }
}

TfaStrategy.Type = {
  Authenticator: 'authenticator',
  Email: 'email'
};

module.exports = TfaStrategy;
