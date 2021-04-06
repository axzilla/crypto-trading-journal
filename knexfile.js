// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.local' })

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: __dirname + '/knex/migrations' },
    seeds: { directory: __dirname + '/knex/seeds' }
  },
  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      charset: 'utf8',
      ssl: true
    },
    migrations: { directory: __dirname + '/knex/migrations' },
    seeds: { directory: __dirname + '/knex/seeds' }
  }
}
