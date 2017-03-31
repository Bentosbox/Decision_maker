
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('options').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('options').insert({id: 1, title: 'Option1', description: 'Option 1 Optional Description', decision_id: 1, total_rank: 5})
      ]);
    });
};
