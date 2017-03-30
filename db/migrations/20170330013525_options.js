exports.up = function(knex, Promise) {
  return knex.schema.createTable('options', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description');
    table.integer('decision_id');
    table.foreign('decision_id').references('decisions.id').onDelete('CASCADE');
    table.integer('total_rank').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('options');
};
