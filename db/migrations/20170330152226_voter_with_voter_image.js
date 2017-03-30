
exports.up = function(knex, Promise) {
  return knex.schema.table('voters', function(table){
    table.text('voter_image_path');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('voters', function(table){
    table.dropColumn('voter_image_path');
  });
};
