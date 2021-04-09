exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('trades', function (table) {
    table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable()
    table.string('exchange').notNullable()
    table.string('symbol').notNullable()
    // table.string('side').notNullable()
    // table.string('quantity_total').notNullable()
    // table.string('quantity_open').notNullable()
    // table.string('cost').notNullable()
    // table.string('avg_entry').notNullable()
    // table.string('avg_exit').notNullable()
    // table.string('return_per_size').notNullable()
    // table.string('return_total').notNullable()
    // table.string('return_percent').notNullable()
    // table.string('return_net').notNullable()
    table.string('status').notNullable().defaultTo('open')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('trades')
}
