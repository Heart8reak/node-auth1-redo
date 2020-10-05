const db = require('../data/db.config');

module.exports = {
	add,
	find,
	findBy,
	findById
};

function find() {
	return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
	return db('users').select('id', 'username', 'password').where(filter);
}

function add(player) {
	return db('users').insert(player, 'id').then((ids) => {
		console.log(ids, 'Welcome, to the MATRIX!');
		const [ id ] = ids;
		return findById(id);
	});
}

function findById(id) {
	return db('users').where({ id }).first();
}
