const { contentSecurityPolicy } = require('helmet');

module.exports = (err, req, res, next) => {
	console.log('express error', err);
	if (err.apiCode >= 400) {
		res.status(err.apiCode).json({
			apiCode: err.apiCode,
			apiMiessage: err.apiMiessage,
			...err
		});
	} else {
		next();
	}
};
