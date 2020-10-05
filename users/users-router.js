const express = require('express');
const router = express.Router();
const Users = require('./users-model');

router.get('/', (req, res) => {
	Users.find()
		.then((user) => {
			res.status(200).json({ message: 'Success', user });
		})
		.catch((err) => {
			res.status(500).json({ message: 'You have not been initiated!, Sorry try again!' });
			console.log({ message: 'You are not logged in', err });
		});
});

module.exports = router;
