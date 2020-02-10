import test from 'ava';

import { hdRandom } from './keys';

test('hdRandom() generates a 24 word mnemonic and keypair', (t) => {
  const { mnemonic, keypair } = hdRandom();

  t.is(mnemonic.split(' ').length, 24, 'mnemonic should be 24 words');
  t.is(keypair.publicKey().length, 56, 'should be a valid public key');
});
