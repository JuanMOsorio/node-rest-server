const jwt = require('jsonwebtoken');

/*
* VERIFICAR EL TOKEN
*/

let checkToken = (req, res, next) => {
	let token = req.get('Authorization');

	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		req.user = decoded.user;

		next();
	});
};

module.exports = { checkToken };
