// this requires our knexfile where we are connecting to our database
const config = require('../knexfile');
// this sets up our environment for heroku
const env = process.env.NODE_ENV || 'development';
// this exports our knex file and environment to run - we call this when we call our connections/js in query.js
module.exports = require('knex')(config[env]);
