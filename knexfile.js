// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.local' })

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:5080@127.0.0.1:5432/crypto-trading-tools?synchronize=true',
    migrations: { directory: __dirname + '/knex/migrations' },
    seeds: { directory: __dirname + '/knex/seeds' }
  }
}
