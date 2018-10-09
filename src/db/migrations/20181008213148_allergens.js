
exports.up = knex => {
  return knex.schema.createTable('allergens', table => {
    table.increments()
    table.string('allergy').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable('allergens')
};
