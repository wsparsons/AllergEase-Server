require('dotenv').load()

const db = require('../src/db')
const knex = require('knex')
const config = require('../knexfile')[process.env.NODE_ENV]
let connection = knex(config)

// finds the connection based on the environment, connect to that database and reseed the database
beforeEach(() => {
  connection = knex(config)
  return connection.seed.run()
})

// After each example, destroy the knex connection pool, so that future tests can reconnect
afterEach(() => connection.destroy())

// After each example, destroy the database connection pool, so that future tests can reconnect
afterAll(() => db.destroy())
