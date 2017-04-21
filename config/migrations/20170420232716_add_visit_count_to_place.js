// Add visit_count column to place table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('place', function (table) {
      table.integer('visit_count');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('place', function (table) {
      table.dropColumn('visit_count');
    })
  ]);
};
