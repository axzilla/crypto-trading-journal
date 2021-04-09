exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('sessions', function (table) {
    table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('user_id').notNullable()
    table.timestamp('expires').notNullable()
    table.string('session_token').notNullable()
    table.string('access_token').notNullable()
    table.timestamps(true, true).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sessions')
}
