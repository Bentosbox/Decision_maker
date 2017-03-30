exports.up = function(knex, Promise) {
  return knex.schema.createTable('polls', function (table) {
    table.increments('id').primary();
    table.integer('voter_id');
    table.foreign('voter_id').references('voters.id').onDelete('CASCADE');
    table.integer('option_id')
    table.foreign('option_id').references('options.id').onDelete('CASCADE');
    table.integer('base_rank').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('polls');
};
