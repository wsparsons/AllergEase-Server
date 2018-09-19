const table = "user_allergen";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table).insert([
        { id: 1, user_id: 1, allergen_id: 3 },
        { id: 2, user_id: 1, allergen_id: 5 },
        { id: 3, user_id: 2, allergen_id: 3 },
        { id: 4, user_id: 2, allergen_id: 1 }
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
      );
    });
};
