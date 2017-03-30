
exports.up = function(knex, Promise) {
  return knex.schema.table('options', function(table){
    table.text('option_image_path');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('options', function(table){
    table.dropColumn('option_image_path');
  });
};
