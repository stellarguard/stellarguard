import test from 'ava';

import {
  Account,
  Keypair,
  Operation,
  Transaction,
  TransactionBuilder,
  Networks
} from 'stellar-sdk';
import { isSignedByAccount, fromXdr, toXdr } from './transactions';

const xdr = `AAAAAGMYTx5ZP/N3ZgJBnRSH6RjScXWDpo7aTflXl7QwnX48AAAAZAAC2MsAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAYxhPHlk/83dmAkGdFIfpGNJxdYOmjtpN+VeXtDCdfjwAAAAAAAAAAACYloAAAAAAAAAAAA==`;
const publicKey = 'GBRRQTY6LE77G53GAJAZ2FEH5EMNE4LVQOTI5WSN7FLZPNBQTV7DZFFZ';
const secret = 'SCHQKCIUKI4ZFVRX2FFXDDYEAVTFVHHUFRCDYHECZLKEN45HRQ5BIAME';

test('isSignedByAccount()', t => {
  const keypair = Keypair.fromSecret(secret);

  const tx = new Transaction(xdr, Networks.TESTNET);
  t.false(isSignedByAccount(tx, keypair.publicKey()));
  tx.sign(keypair);
  t.true(isSignedByAccount(tx, keypair.publicKey()));
});

test('fromXdr()', t => {
  const tx = fromXdr(xdr);
  t.truthy(tx);
  t.is(tx.source, publicKey);
});

test('toXdr()', t => {
  const source = new Account(publicKey, '0');
  const tx = new TransactionBuilder(source, {
    fee: 100,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(
      Operation.createAccount({
        destination: publicKey,
        startingBalance: '25'
      })
    )
    .setTimeout(30)
    .build();

  const xdr = toXdr(tx);
  t.truthy(xdr);
});
