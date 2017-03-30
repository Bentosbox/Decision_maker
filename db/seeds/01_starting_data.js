
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decisions').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('decisions').insert({id: 1, title: 'Hello', time: 15, message: 'hello World', admin_email: 'abc@xyz.com', admin_name: 'abc', admin_url: 'abc'})
      ]);
    });
};
