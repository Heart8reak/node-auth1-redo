const express = require('express');
const helmet = require('helmet');
// const sessions = require('express-session');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/', (req, res) => {
	// res.status(200).json({ message: `The SERVER is up and Running` });
	res.send(`<h3>The Backend is ready for Authentication! ;-)</h3>`);
});

module.exports = server;
