exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('accounts', function (table) {
    table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('compound_id').notNullable()
    table.string('user_id').notNullable()
    table.string('provider_type').notNullable()
    table.string('provider_id').notNullable()
    table.string('provider_account_id').notNullable()
    table.string('refresh_token').notNullable()
    table.string('access_token').notNullable()
    table.timestamp('access_token_expires').notNullable()
    table.timestamps(true, true).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('accounts')
}
