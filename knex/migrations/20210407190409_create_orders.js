exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('orders', function (table) {
    table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable()
    table.uuid('trade_id').notNullable()
    table.string('side').notNullable()
    table.timestamp('date').notNullable()
    table.string('price').notNullable()
    table.string('quantity').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('orders')
}
