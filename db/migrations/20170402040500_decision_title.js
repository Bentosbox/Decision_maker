
exports.up = function(knex, Promise) {
  return knex.schema.table('decisions', function(table){
    table.renameColumn('title', 'decision_title')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('decisions', function(table){
    table.renameColumn('decision_title', 'title')
  });
};
