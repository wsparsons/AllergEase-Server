const { hashSync } = require("bcryptjs");

const table = "users";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table).insert([
        {
          id: 1,
          first_name: "Clark",
          last_name: "Kent",
          email: "super@man.com",
          password: hashSync("password")
        },
        {
          id: 2,
          first_name: "Bruce",
          last_name: "Wayne",
          email: "bat@man.com",
          password: hashSync("1234qwer")
        },
        {
          id: 3,
          first_name: "Peter",
          last_name: "Parker",
          email: "spider@man.com",
          password: hashSync("7890uiop")
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
      );
    });
};
