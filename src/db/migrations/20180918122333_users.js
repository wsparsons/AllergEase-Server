
exports.up = knex => {
  return knex.schema.createTable('users', table => {
      table.increments()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable().defaultsTo('')
      table.string('email').notNullable().unique()
      table.text('password').notNullable()
      table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('users')
}
