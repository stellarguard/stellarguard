const cluster = require('cluster');
const http = require('http');
const numCPUs = Number(process.env.CPUS || 0) || require('os').cpus().length;
const Keypair = require('stellar-sdk').Keypair;

const target = 'GUARD';

if (cluster.isMaster) {
  let total = 0;
  console.log(`Master ${process.pid} is running`);
  let start = Date.now();
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.on('message', msg => {
      if (msg.code === 1) {
        console.log(msg);
        total = msg.count;
        process.exit(0);
      } else if (msg.code === 2) {
        total += msg.count;
      }
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  process.on('SIGINT', function() {
    process.exit();
  });

  process.on('exit', function() {
    displayTotal();
    killAllWorkers();
  });

  function killAllWorkers() {
    for (let id in cluster.workers) {
      const worker = cluster.workers[id];
      process.kill(worker.process.pid, 'SIGINT');
    }
  }

  function displayTotal() {
    console.log(`Ran ${total} rounds in ${(Date.now() - start) / 1000}seconds`);
  }

  setInterval(async function() {
    const batteryLevel = require('battery-level');
    const level = await batteryLevel();
    if (level <= 0.05) {
      console.log('BATTERY LOW, EXITING');
      process.exit(1);
    }
  }, 1000 * 60);
} else {
  console.log(`Worker ${process.pid} started`);
  var count = 0;
  while (true) {
    var keypair = Keypair.random();
    var publicKey = keypair.publicKey();

    if (publicKey.endsWith(target)) {
      console.log('!!!!!!!!!FOUND IT!!!!!!!!!!');
      console.log(publicKey);
      console.log(keypair.secret());
      process.send({ code: 1, publicKey, secret: keypair.secret(), count });
    }

    count++;
  }
}
