# StellarGuard

[StellarGuard](https://stellarguard.me) - protect your Stellar Lumens with multisig and two factor auth.

# Getting Started

## Prerequisites

In order to develop locally, you will need to install the following on your system:

[NodeJS](https://nodejs.org/en/) - Requires Node 9 or above, used for building the UI code and running the server

[Yarn](https://yarnpkg.com/en/) - Used for package management

[Postgres](https://www.postgresql.org/download/) - Requires Postgres 9.3 or above

[Redis](https://redis.io/download) - Requires Redis 4.0 or above

After forking and cloning the repo:

1.  Start the Postgres server
1.  `./setup.sh` - This will create your .env.dev.local configuration file, install project dependencies, and create the `stellarguard` database

## Running the develoment server

`yarn dev` - This builds the UI and starts a nodejs server on port 3000. Open your browser to http://localhost:3000 after running this

# Technologies Used

## Server

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## Front End

- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [MobX](https://mobx.js.org/)

## Data stores

- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io)

# Project Structure

**src/server** - Code for the NodeJS server

**src/ui** - Code for the React-based UI

**src/shared** - Code that is shared in both the UI and Server (such as validations)

**migrations** - This is where database migrations are stored. Run migrations using `db-migrate up` and create migrations with `db-migrate create <migration name>`). See https://db-migrate.readthedocs.io/ for usage instructions

**scripts** - Standalone scripts such as deployment scripts and configuration

# License

[MIT](LICENSE)
