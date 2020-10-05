const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', async (req, res, next) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;
	try {
		const saved = await Users.add(user);
		res.status(201).json({ message: 'Success', saved });
	} catch (err) {
		next({ apiCode: 500, apiMessage: 'error registering', ...err });
	}
});

// router.post('/login', async (req, res, next) => {
// 	let { username, password } = req.body;
// 	const [ user ] = await Users.findBy({ username });

// 	try {
// 		if (user && bcrypt.compareSync(password, user.password)) {
// 			req.session.user = user;
// 			res.status(200).json({ message: `Welcome ${user.username}, you are the winner!` });
// 		} else {
// 			next({ apiCode: 401, apiMessage: 'Invalid Credentials' });
// 		}
// 	} catch (err) {
// 		next({ apiCode: 500, apiMessage: 'Error Logging in', ...err });
// 	}
// });

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
