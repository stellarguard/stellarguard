const FileDb = new require('../FileDb');
const db = new FileDb('user');
db.indexOn('username');

module.exports = db;
