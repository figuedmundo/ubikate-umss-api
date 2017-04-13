
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('place_image', function (table) {
      table.increments().primary();
      table.string('cloudinary_public_id');

      //foreing key to place
      table.integer('place_id').references('gid').inTable('place');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('place_image')
  ]);
};
