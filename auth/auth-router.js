const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', async (req, res, next) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.add(user)
		.then(
			(user) =>
				user
					? (req.session.loggedIn = true) & res.status(200).json({ message: 'Success', user })
					: res.status(400).json({ message: 'We need your name and password to continue' })
		)
		.catch((err) => res.status(500).json({ message: err.message }));

	// try {
	// 	const saved = await Users.add(user);
	// 	res.status(201).json(saved);
	// } catch (err) {
	// 	next({ apiCode: 500, apiMessage: 'Error in Registering', ...err });
	// }
	// let user = req.body;
	// const rounds = 10;
	// const hash = bcrypt.hashSync(user.password, rounds);
	// user.password = hash;
	// Users.add(user)
	// 	.then((saved) => {
	// 		res.status(201).json({ message: 'Success with creating your Awesome password', saved });
	// 	})
	// 	.catch((error) => {
	// 		res.status(500).json({ errorMessage: error.message });
	// 	});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	if (username && password) {
		Users.findBy({ username })
			.first()
			.then((user) => {
				user && bcrypt.compareSync(password, user.password)
					? (req.session.username = user.username) &
						(req.session.loggedIn = true) &
						res.status(200).json({ message: `Welcome ${username}` })
					: res.status(401).json({ message: `Who are you??? Invalid Credentials` });
			})
			.catch((err) => res.status(500).json({ errorMessage: error.message }));
	} else {
		res.status(400).json({ error: 'You shall not pass!' });
	}
});

router.get('/logout', (req, res) => {
	console.log(req.session.cookie);
	req.session
		? res.clearCookie('Authproject', { path: '/' }) &&
			req.session.destroy((err) => {
				err
					? res.status(500).json({ you: 'Buckle-Up Baby, we are staying a little bit longer!' })
					: res.status(200).json({ message: 'See you later SUCKA!' });
			})
		: res.status(200).json({ message: 'Hasta La Vista Baby!' });
});

module.exports = router;
