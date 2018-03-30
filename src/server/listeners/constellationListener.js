'use strict';

const { constellation } = require('../lib');

class ConstellationListener {
  start() {
    constellation.constellationService.listenForTransactions();
  }
}

module.exports = new ConstellationListener();
