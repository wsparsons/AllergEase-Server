const table = "allergens";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table).insert([
        { id: 1, allergy: "peanut" },
        { id: 2, allergy: "tree nut" },
        { id: 3, allergy: "milk" },
        { id: 4, allergy: "egg" },
        { id: 5, allergy: "soy" },
        { id: 6, allergy: "wheat" },
        { id: 7, allergy: "fish" },
        { id: 8, allergy: "crustacean shellfish" }
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
      );
    });
};
