const path = require('path')
require('dotenv').load()

module.exports = {

  development: {
    client: 'pg',
    connection: `postgres://localhost/${process.env.DATABASE_NAME}_dev`,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },

  test: {
    client: 'pg',
    connection: `postgres://localhost/${process.env.DATABASE_NAME}_test`,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
  }
}
