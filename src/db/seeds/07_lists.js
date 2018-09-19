const table = "lists";
exports.seed = knex => {
  return knex(table)
    .insert([
      {id: 1, product_id: 1, user_id: 1, valence: true},
      {id: 2, product_id: 2, user_id: 1, valence: false},
      {id: 3, product_id: 3, user_id: 1, valence: false},
      {id: 4, product_id: 4, user_id: 1, valence: true},
      {id: 5, product_id: 1, user_id: 2, valence: true},
      {id: 6, product_id: 2, user_id: 2, valence: false},
      {id: 7, product_id: 3, user_id: 2, valence: false},
      {id: 8, product_id: 4, user_id: 2, valence: true}, {id: 9, product_id: 1, user_id: 3, valence: false},
      {id: 10, product_id: 2, user_id: 3, valence: false},
      {id: 11, product_id: 3, user_id: 3, valence: false},
      {id: 12, product_id: 4, user_id: 3, valence: false}
    ])
    .then(() => {
      return knex.raw(
        `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
      );
    });
};