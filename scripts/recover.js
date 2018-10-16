var dotenv = require('dotenv');
dotenv.config({ path: './.env.prod' });

var key = process.argv[2];
var crypto = require('../src/server/lib/utils/crypto');
crypto.decrypt(key).then(c => console.log(c));
