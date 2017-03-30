exports.up = function(knex, Promise) {
  return knex.schema.createTable('decisions', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('message');
    table.integer('time').notNullable();
    table.string('admin_email').notNullable();
    table.string('admin_url').notNullable();
    table.string('admin_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decisions');
};
