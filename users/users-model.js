const db = require('../data/db.config');

module.exports = {
	add,
	find,
	findBy,
	findById
};

function find(id) {
	return db('users').select('id', 'username', 'password').where({ id }).first();
}

function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
	return db('users').insert(user, 'id').then((ids) => {
		console.log(ids, 'Welcome, to the MATRIX!');
		const [ id ] = ids;
		return getById(id);
	});
}

function findById(id) {
	return db('users').where({ id }).first();
}
