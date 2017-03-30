
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('voters').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('voters').insert({id: 1, voter_email: 'def@xyz.com', voter_name: 'DEF', voter_url: 'def', decision_id: 1})
      ]);
    });
};
