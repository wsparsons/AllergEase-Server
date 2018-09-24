exports.up = knex => {
  return knex.schema.createTable('lists', table => {
    table.increments()
    table.integer('product_id').notNullable()
    table.foreign('product_id').references('products.id').onDelete('CASCADE')
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.boolean('valence').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable('lists')
};