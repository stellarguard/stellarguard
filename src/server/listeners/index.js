const constellationListener = require('./constellationListener');
const interstellarExchangeListener = require('./interstellarExchangeListener');

const listeners = [constellationListener, interstellarExchangeListener];

function start() {
  console.log('Starting Listeners');
  listeners.forEach(listener => listener.start());
}

function stop() {
  console.log('Stopping Listeners');
  listeners.forEach(listener => listener.stop());
}

function restart() {
  stop();
  start();
}

module.exports = {
  start,
  stop,
  restart
};
