exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('trades', function (table) {
    table.increments('id').primary()
    table.uuid('user').notNullable()
    table.uuid('uuid').unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('exchange').notNullable()
    table.string('symbol').notNullable()
    table.string('action').notNullable()
    table.timestamp('date').notNullable()
    table.string('price').notNullable()
    table.string('quantity').notNullable()
    table.string('fee').notNullable()
    table.string('status').notNullable().defaultTo('open')
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('trades')
}
