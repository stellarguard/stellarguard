const env = require('./env');

module.exports = {
  host: env.pgHost,
  user: env.pgUser,
  password: env.pgPassword,
  database: 'stellarguard',
  max: 20,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000
};
