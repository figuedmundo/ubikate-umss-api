
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function (table) {
      table.increments('user_id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('user')
  ]);
};
