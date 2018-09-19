

exports.up = knex => {
  return knex.schema.createTable('products', table => {
    table.increments()
    table.string('name').notNullable()
    table.string('ndbno').notNullable()
    table.string('barcode').notNullable()
    table.text('ingredients').notNullable()
    table.text('manufacturer').notNullable().defaultsTo('')
    table.text('image').notNullable().defaultsTo('')
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable('products')
};
