// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.local' })

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT
    },
    migrations: { directory: __dirname + '/knex/migrations' }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      ssl: { require: true, rejectUnauthorized: false }
    },
    migrations: { directory: __dirname + '/knex/migrations' }
  }
}
