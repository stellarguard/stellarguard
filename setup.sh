#! /bin/bash -xe

yarn
yarn global add db-migrate

echo "
export DEV_MODE=1
export SESSION_SECRET=mydevsecret
export DOMAIN_NAME=http://localhost:3000
export PG_HOST=localhost
export PG_USER=$(whoami)
" > .env.dev

db-migrate db:create stellarguard
db-migrate up

echo "Setup success! Use `yarn dev` to start the dev server and open your browser to http://localhost:3000"