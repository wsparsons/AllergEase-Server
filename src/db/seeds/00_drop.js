exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(() => knex('allergen_description').del())
    .then(() => knex('user_allergen').del())
    .then(() => knex('products').del())
    .then(() => knex('descriptions').del())
    .then(() => knex('allergens').del())
    .then(() => knex('users').del())
}