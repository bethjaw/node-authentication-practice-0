const db = require('./connection');

// this is our createUser function where it takes in user information
function createUser(user) {
	// we call our function that generates a random code for our user
	const code = generateRandomString();

	// we add the code to the user information (object)
	user.code = code;
// we access our database and insert our new user, also sending back their id and code
	return db('site-users').insert(user).returning(['id', 'code']);
}

// this is where we can get a single user by id - the function takes the id
function getUserById(id) {
	// we access our database and the first item where the id = the id we give it
	return db('site-users').first().where('id', id);
}

// should generate a random code
function generateRandomString() {
	// needs some help here!
	return 'abcd';
}

// this is where the user can login. it takes the code that they were given when they created themselves as a user
function login(code) {
	// we access the database and select all information where the code in the user info equals the code that the user puts in
	return db('site-users').select().where('code', code);
}

module.exports = {
	createUser,
	getUserById,
	login
};
