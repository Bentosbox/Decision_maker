
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polls').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('polls').insert({id: 1, voter_id: 1, option_id: 1, base_rank: 5})
      ]);
    });
};
