const config = require('../config');
const jobName = process.argv[2];

(async () => {
  try {
    console.log(`Starting ${jobName}`);
    const Job = require(`./${jobName}`);
    const job = new Job({ config });
    await job.run(...process.argv.slice(3));
    console.log(`Finished ${jobName}`);
  } catch (e) {
    console.error(`Failed ${jobName}`, e);
    process.exit(1);
  }
})();
