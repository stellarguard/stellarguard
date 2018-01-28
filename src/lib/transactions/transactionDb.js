const FileDb = require('../FileDb');
const db = new FileDb('transaction');
db.indexOn('userId', { multi: true });
module.exports = db;
