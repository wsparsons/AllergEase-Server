
exports.up = knex => {
  return knex.schema.createTable('descriptions', table => {
    table.increments()
    table.string('description').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable('descriptions')
};
