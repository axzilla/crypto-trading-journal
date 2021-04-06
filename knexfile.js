// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.local' })

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: __dirname + '/knex/migrations' },
    seeds: { directory: __dirname + '/knex/seeds' }
  }
}
