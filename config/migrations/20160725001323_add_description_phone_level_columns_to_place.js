
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('place', function (table) {
      table.string('description');
      table.string('phone', 20);
      table.integer('level');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('place', function (table) {
      table.dropColumn('description');
      table.dropColumn('phone');
      table.dropColumn('level');      
    })
  ]);
};
