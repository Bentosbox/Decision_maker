
exports.up = function(knex, Promise) {
  return knex.schema.table('decisions', function(table){
    table.text('admin_image_path');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('decisions', function(table){
    table.dropColumn('admin_image_path');
  });
};
