const constellationListener = require('./constellationListener');
const interstellarExchangeListener = require('./interstellarExchangeListener');

function start() {
  constellationListener.start();
  interstellarExchangeListener.start();
}

module.exports = {
  start
};
