import test from 'ava';
import sinon from 'sinon';
import ms from 'ms';

import authenticatorOtp from './authenticatorOtp';

test.beforeEach(t => {
  t.context.clock = sinon.useFakeTimers(ms('100s'));
});

test.afterEach(t => {
  t.context.clock.restore();
});

test.serial('generateSecret returns a secret', async t => {
  const { secret } = await authenticatorOtp.generateSecret('test@example.com');
  t.is(secret.length > 0, true);
});

test.serial(
  'verifyToken returns true for tokens genrated within a single window',
  async t => {
    const { secret } = await authenticatorOtp.generateSecret(
      'test@example.com'
    );

    // current window
    const token = authenticatorOtp.generateToken(secret);
    t.is(authenticatorOtp.verifyToken(token, secret), true);

    // expired one window
    t.context.clock.tick(ms('45s'));
    t.is(authenticatorOtp.verifyToken(token, secret), true);

    // expired more than one window
    t.context.clock.tick(ms('45s'));
    t.is(authenticatorOtp.verifyToken(token, secret), false);

    // one window into the future
    t.context.clock = sinon.useFakeTimers(ms('80s'));
    t.is(authenticatorOtp.verifyToken(token, secret), true);

    // more than one window into the future
    t.context.clock = sinon.useFakeTimers(ms('30s'));
    t.is(authenticatorOtp.verifyToken(token, secret), false);
  }
);
