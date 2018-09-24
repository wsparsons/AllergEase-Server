
exports.up = knex => {
  return knex.schema.createTable('aliases', table => {
    table.increments()
    table.integer('allergen_id').notNullable()
    table.foreign('allergen_id').references('allergens.id').onDelete('CASCADE')
    table.string('description').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable('aliases')
};
