
exports.up = knex => {
  return knex.schema.createTable('user_allergen', table => {
    table.increments()
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('allergen_id').notNullable()
    table.foreign('allergen_id').references('allergens.id').onDelete('CASCADE')
  })
};

exports.down = knex => {
  return knex.schema.dropTable('user_allergen')
};
