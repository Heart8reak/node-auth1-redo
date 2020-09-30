const server = require('./api/server');

const port = process.env.PORT || 3030;

server.listen(port, () => {
	console.log(`Server is ready for Authentication on PORT:${port}`);
});
