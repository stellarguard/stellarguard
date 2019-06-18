const RedisGCRA = require('redis-gcra');

const db = require('../db');

const limiter = RedisGCRA({
  redis: db.redis,
  keyPrefix: 'stellarguard'
});

module.exports = limiter;
