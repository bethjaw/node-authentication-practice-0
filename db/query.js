const db = require('./connection');

function createUser(user) {
	const code = generateRandomString();

	user.code = code;

	return db('site-users').insert(user).returning(['id', 'code']);
}

function getUserById(id) {
	return db('site-users').first().where('id', id);
}

function generateRandomString() {
	return 'abcd';
}

function login(code) {
	return db('site-users').select().where('code', code);
}

module.exports = {
	createUser,
	getUserById,
	login
};
