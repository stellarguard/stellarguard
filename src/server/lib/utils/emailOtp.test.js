import test from 'ava';
import sinon from 'sinon';
import ms from 'ms';

import emailOtp from './emailOtp';

test.beforeEach(t => {
  t.context.clock = sinon.useFakeTimers();
});

test.afterEach(t => {
  t.context.clock.restore();
});

test('generateSecret() returns a secret', t => {
  t.is(emailOtp.generateSecret().length >= 20, true);
});

test('generateToken() generates a 9 digit token', t => {
  t.is(emailOtp.generateToken('secret').length === 9, true);
});

test('generateToken() accepts a suffix', t => {
  const secret = 'secret';
  const token = emailOtp.generateToken(secret, { suffix: 'abc' });
  t.not(token, emailOtp.generateToken(secret));

  t.is(true, emailOtp.verifyToken(token, secret, { suffix: 'abc' }));
});

test('verifyToken() is true with a newly generated token', t => {
  const secret = 'secret';
  const token = emailOtp.generateToken(secret);
  t.is(emailOtp.verifyToken(token, secret), true);
});

test('verifyToken() is false with an invalid token', t => {
  const secret = 'secret';
  const token = '123456789012';
  t.is(emailOtp.verifyToken(token, secret), false);
});

test('verifyToken() is false after 24 hours', t => {
  const secret = 'secret';
  const token = emailOtp.generateToken(secret);
  t.context.clock.tick(ms('1d'));
  t.is(emailOtp.verifyToken(token, secret), true);
  t.context.clock.tick(ms('1m'));
  t.is(emailOtp.verifyToken(token, secret), false);
});
