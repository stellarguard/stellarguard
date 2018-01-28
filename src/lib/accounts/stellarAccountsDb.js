const FileDb = new require('../FileDb');
const db = new FileDb('stellarAccounts');
db.indexOn('publicKey', { multi: true });
db.indexOn('userId');

module.exports = db;
