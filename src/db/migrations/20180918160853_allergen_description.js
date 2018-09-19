
exports.up = knex => {
  return knex.schema.createTable('allergen_description', table => {
    table.increments()
    table.integer('allergen_id').notNullable()
    table.foreign('allergen_id').references('allergens.id').onDelete('CASCADE')
    table.integer('description_id').notNullable()
    table.foreign('description_id').references('descriptions.id').onDelete('CASCADE')
  })
};

exports.down = knex => {
  return knex.schema.dropTable('allergen_description')
};
