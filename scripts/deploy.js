let version;
const util = require('util');
process.env.NODE_ENV = 'production';
const env = process.argv[2];
const path = require('path');
const rimraf = util.promisify(require('rimraf'));
const fs = require('fs');
const dryRun = !!process.env.DRY_RUN;
const { execSync, spawn } = require('child_process');

const envConfig = {
  test: {
    dotenv: '.env.test',
    project: 'stellarguard-test',
    appYaml: {
      scalingMinInstances: 1,
      cpuTargetUtilization: 0.8
    },
    cloudStorageBucket: 'cdn-test.stellarguard.me',
    publicUrl: '//cdn-test.stellarguard.me/assets/'
  },
  prod: {
    dotenv: '.env.prod',
    project: 'stellarguard-prod',
    appYaml: {
      scalingMinInstances: 2,
      cpuTargetUtilization: 0.7
    },
    cloudStorageBucket: 'cdn.stellarguard.me',
    publicUrl: '//cdn.stellarguard.me/assets'
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
  const dist = rimraf('./dist', {});
  const appYaml = rimraf('./app.yaml', {});

  return Promise.all([dist, appYaml]);
}

function bumpVersion() {
  if (env === 'test') {
    // prod is expected to have been bumped already by test
    execSync(`yarn version`, { stdio: [0, 1, 2] });
  }

  version = require('../package.json').version;
  process.env.APP_VERSION = version;
}

async function build() {
  const Bundler = require('parcel-bundler');

  const options = {
    outDir: `./dist/`,
    publicUrl: config.publicUrl,
    watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: false, // Enabled or disables caching, defaults to true
    minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors    sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
    detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  };

  const bundler = new Bundler('./src/ui/index.html', options);
  return await bundler.bundle();
}

async function uploadFiles() {
  return await execSync(
    `gsutil -h "Cache-Control:max-age=3600000, immutable" -m cp -Z -n dist/* gs://${
      config.cloudStorageBucket
    }/assets`
  );
}

async function migrate() {
  execSync('brew services stop postgres || echo already stopped');
  execSync(`gcloud config set project ${config.project}`); // we need to run migrations in the current project so things like KMS work properly
  const instance = process.env.CLOUD_SQL_INSTANCE;
  const sqlProxy = spawn(
    `cloud_sql_proxy`,
    [`-instances=${instance}=tcp:5432`],
    {
      stdio: [0, 1, 2]
    }
  );

  sqlProxy.on('error', err => {
    console.error(err);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        execSync(`db-migrate up -e ${env}`, { stdio: [0, 1, 2] });
      } catch (e) {
        reject(e);
      }

      resolve();
    }, 1000);
  });
  sqlProxy.kill();
  execSync('brew services start postgres');
}

function deploy() {
  require('ejs');
  const template = require('./app.yaml.ejs');
  const appConfig = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    CLOUD_SQL_INSTANCE: process.env.CLOUD_SQL_INSTANCE,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
    USE_STELLAR_PUBLIC_NETWORK: process.env.USE_STELLAR_PUBLIC_NETWORK
  };
  const locals = Object.assign({}, appConfig, config.appYaml);
  const appYaml = template(locals);
  const fs = require('fs');
  fs.writeFileSync('app.yaml', appYaml);

  console.log('--------------------------------------------');
  console.log(`Deploying ${version} to ${env} with app.yaml:`);
  console.log(appYaml);

  const gcloudVersion = version.replace(/\./g, '-');

  execSync(
    `gcloud app deploy app.yaml --project=${
      config.project
    } -v ${gcloudVersion}`,
    { stdio: [0, 1, 2] }
  );
}

(async () => {
  if (dryRun) {
    await loadEnv();
    await clean();
    await build();
    await uploadFiles();
  } else {
    await loadEnv();
    await clean();
    await bumpVersion();
    await build();
    await uploadFiles();
    await migrate();
    await deploy();
  }
})();
