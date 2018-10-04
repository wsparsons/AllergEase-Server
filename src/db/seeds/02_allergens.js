const table = "allergens";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table).insert([
        { id: 1, allergy: "corn" },
        { id: 2, allergy: "egg" },
        { id: 3, allergy: "fish, shellfish, crustaceans" },
        { id: 4, allergy: "milk" },
        { id: 5, allergy: "peanut" },
        { id: 6, allergy: "sesame" },
        { id: 7, allergy: "soy" },
        { id: 8, allergy: "sulphite" },
        { id: 9, allergy: "tree nut" },
        { id: 10, allergy: "wheat" }
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
      );
    });
};
