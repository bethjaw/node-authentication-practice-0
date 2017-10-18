
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('site-users', table => {
      table.increments();
      table.string('email');
      table.string('code');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('site-users')
  ]);
};
