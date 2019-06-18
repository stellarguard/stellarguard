const config = require('../../config');

const Redis = require('ioredis');
const redis = new Redis(config.redis.connectionString);

module.exports = redis;
