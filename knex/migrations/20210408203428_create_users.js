exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name')
    table.string('email')
    table.timestamp('email_verified')
    table.string('image')
    table.timestamps(true, true).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
