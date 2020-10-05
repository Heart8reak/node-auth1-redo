const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const errorHandler = require('./errorHandler');

const UsersRouter = require('../users/users-router');
const AuthRouter = require('../auth/auth-router');
const LoginRouter = require('../login/login-router');

const Authenticator = require('../auth/authenticator');

const server = express();

const sessionConfig = {
	name: 'Ricky Bobby',
	secret: 'Say Hello To My Little Friend, TOMAA',
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
		httpOnly: true
	},
	resave: false,
	saveUninitialized: false
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());

server.use('/api/users', Authenticator, UsersRouter);
server.use('/api/auth', AuthRouter);
server.use('/api/login', LoginRouter);

server.use('/', (req, res) => {
	res.status(200).json({ message: `The SERVER is up and Running` });
	// res.send(`<h3>The Backend is ready for Authentication! ;-)</h3>`);
});

server.use(errorHandler);

module.exports = server;
