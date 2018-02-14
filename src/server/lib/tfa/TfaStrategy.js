class TfaStrategy {
  constructor({ id, type, userId }) {
    this.type = type;
    this.userId = userId;
    this.id = id;
  }
}

TfaStrategy.Type = {
  Authenticator: 'authenticator',
  Email: 'email'
};

module.exports = TfaStrategy;
