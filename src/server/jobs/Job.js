class Job {
  constructor({ config }) {
    this.config = config;
  }

  async run() {
    throw 'Run is not implemented';
  }
}

module.exports = Job;
