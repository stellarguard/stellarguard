const version = require('../package.json').version;
process.env.NODE_ENV = 'production';
const env = process.argv[2];
const path = require('path');
const rimraf = require('rimraf');

const envConfig = {
  test: {
    dotenv: '.env.test',
    appyaml: 'app.test.yaml.ejs',
    project: 'stellarguard-test'
  },
  prod: {
    dotenv: '.env.prod',
    appyaml: 'app.prod.yaml.ejs',
    project: 'stellarguard'
  }
};

const config = envConfig[env];
if (!config) {
  throw new Error(
    'Could not find env config. Did you enter test or prod as arguments?'
  );
}

function loadEnv() {
  const file = path.resolve(config.dotenv);
  require('dotenv').config({ path: file });
}

function clean() {
  const dist = new Promise(function(resolve, reject) {
    rimraf('./dist', {}, function(err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

  const appYaml = new Promise(function(resolve, reject) {
    rimraf('./app.yaml', {}, function(err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

  return Promise.all([dist, appYaml]);
}

async function build() {
  const Bundler = require('parcel-bundler');

  const options = {
    outDir: `./dist/${version}/`,
    publicUrl: `/dist/${version}/`,
    watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: false, // Enabled or disables caching, defaults to true
    minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors    sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
    detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  };

  const bundler = new Bundler('./src/ui/index.html', options);
  return await bundler.bundle();
}

function deploy() {
  require('ejs');
  const template = require('./app.yaml.ejs');
  const appYaml = template({
    SESSION_SECRET: process.env.SESSION_SECRET,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    CLOUD_SQL_INSTANCE: process.env.CLOUD_SQL_INSTANCE,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY
  });

  const fs = require('fs');
  fs.writeFileSync('app.yaml', appYaml);

  console.log(`Deploying ${version} with app.yaml:`);
  console.log(appYaml);

  // require('child_process').execSync(
  //   `gcloud app deploy app.yaml --project=${config.project} -v ${version}`,
  //   { stdio: [0, 1, 2] }
  // );
}

(async () => {
  await loadEnv();
  await clean();
  await build();
  await deploy();
})();
