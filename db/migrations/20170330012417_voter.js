exports.up = function(knex, Promise) {
  return knex.schema.createTable('voters', function (table) {
    table.increments('id').primary();
    table.string('voter_email').notNullable();
    table.string('voter_name');
    table.string('voter_url').notNullable();
    table.integer('decision_id');
    table.foreign('decision_id').references('decisions.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('voters');
};
