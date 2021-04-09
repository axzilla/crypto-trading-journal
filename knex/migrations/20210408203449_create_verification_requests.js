exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('verification_requests', function (table) {
    table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('identifier').notNullable()
    table.string('token').notNullable()
    table.timestamp('expires').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('verification_requests')
}
