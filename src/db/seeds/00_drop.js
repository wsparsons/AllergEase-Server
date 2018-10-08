exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_allergen').del()
    .then(() => knex('aliases').del())
    .then(() => knex('products').del())
    .then(() => knex('allergens').del())
    .then(() => knex('users').del())
}