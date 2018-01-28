const encryptionKey = 'sekrut';
const Cryptr = require('cryptr');
const crypto = require('crypto');

function getDepositToken(username, algo) {
  const cryptr = new Cryptr(encryptionKey, algo);
  return toHex(cryptr.encrypt(username));
}

function toHex(b) {
  return new Buffer(b, 'utf-8').toString('hex');
}

function fromHex(a) {
  return new Buffer(a, 'hex').toString('utf-8');
}

function getUsernameFromDepositToken(token, algo) {
  const cryptr = new Cryptr(encryptionKey, algo);
  return cryptr.decrypt(fromHex(token));
}

var ciphers = crypto.getCiphers();
for (var i = 0; i < ciphers.length; i++) {
  try {
    const encrypted = getDepositToken('abcdefghijklmn', ciphers[i]);
    const decrypted = getUsernameFromDepositToken(encrypted, ciphers[i]);
    console.log(encrypted.length, encrypted, decrypted);
    console.log(decrypted);
  } catch (e) {}
}
