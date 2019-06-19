const RedisGCRA = require('redis-gcra');
const ms = require('ms');

const db = require('../db');

const limiter = RedisGCRA({
  redis: db.redis,
  keyPrefix: 'stellarguard'
});

class RateLimiterBuilder {
  perSecond(n) {
    this.rate = n;
    this.burst = n;
    this.period = ms('1s');
    return this;
  }

  perMinute(n) {
    this.rate = n;
    this.burst = n;
    this.period = ms('1m');
    return this;
  }

  perHour(n) {
    this.rate = n;
    this.burst = n;
    this.period = ms('1h');
    return this;
  }

  perDay(n) {
    this.rate = n;
    this.burst = n;
    this.period = ms('1d');
    return this;
  }

  cost(c) {
    this.c = c;
    return this;
  }

  keyPrefix(keyPrefix) {
    this.keyPrefix = keyPrefix;
    return this;
  }

  build() {
    return new RateLimiter({
      rate: this.rate,
      burst: this.burst,
      period: this.period,
      cost: this.c,
      keyPrefix: this.keyPrefix || ''
    });
  }
}

class RateLimiter {
  static newBuilder() {
    return new RateLimiterBuilder();
  }

  constructor({ rate, burst, period, cost, keyPrefix }) {
    this.rate = rate;
    this.burst = burst;
    this.period = period;
    this.cost = cost || 1;
    this.keyPrefix = keyPrefix || '';
  }

  limit(key, cost = this.cost) {
    return limiter.limit({
      key: this.keyPrefix + key,
      cost,
      rate: this.rate,
      period: this.period,
      burst: this.burst
    });
  }

  peek(key) {
    return limiter.peek({
      key: this.keyPrefix + key,
      rate: this.rate,
      period: this.period,
      burst: this.burst
    });
  }

  reset(key) {
    return limiter.reset({ key: this.keyPrefix + key });
  }
}

exports.RateLimiter = RateLimiter;
exports.RateLimiterBuilder = RateLimiterBuilder;
