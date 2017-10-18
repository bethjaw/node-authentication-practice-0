
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('site-users').del()
    .then(function () {
      // Inserts seed entries
      return knex('site-users').insert([
        {email: 'brooks@brookzerker.com', code: 'pe48se'},
        {email: 'michelle@resident.com', code: 'ujyg9'},
        {email: 'kyle@galv.com', code: 'jgfn86'}
      ]);
    });
};
