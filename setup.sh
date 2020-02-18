#! /bin/bash -e

echo "Installing project dependencies"
if [ -z "$(which yarn)" ]; then
   echo -e "\033[31m'yarn' could not be found. Please install it from https://yarnpkg.com and rerun setup".
   exit 1
fi

yarn

echo "Creating local env file"
echo "
export PG_HOST=localhost     # REQUIRED - the host of your postgres instance
export PG_USER=stellarguard  # REQUIRED - change this to the user you want for your local postgres instance
export PG_PASSWORD=stellarguard # REQUIRED - change this to the password for your local postgres
export REDIS_CONNECTION_STRING=redis://localhost:6379   # REQUIRED - the connection string to use to connect to redis

#export SEND_GRID_API_KEY=   # OPTIONAL - use this if you want to send emails via sendgrid in development
#export RECAPTCHA_SITE_KEY=  # OPTIONAL - use this if you want to enable recaptcha in development
#export RECAPTCHA_SECRET=    # OPTIONAL - use this if you want to enable recaptcha in development
" > .env.dev.local

echo "Creating StellarGuard database"
yarn global add db-migrate
NODE_PATH=src/shared db-migrate up

echo "
Setup success!
------------------------------
Open .env.dev.local to fill out any additional configuration
------------------------------
Use 'yarn dev' to start the dev server and then open your browser to http://localhost:3000
"
