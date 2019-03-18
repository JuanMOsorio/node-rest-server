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
				err: {
					message: 'Token no valido!!'
				}
			});
		}

		req.user = decoded.user;

		next();
	});
};

/*
* VERIFICA ADMIN ROLE
*/

let checkAdminRole = (req, res, next) => {
	let user = req.user;

	if (user.role != 'ADMIN_ROLE') {
		return res.json({
			ok: false,
			err: {
				message: 'El usuario no es administrador'
			}
		});
	}

	next();
};

/*
* VERIFICA TOKE IMG
*/

let checkTokenImg = (req, res, next) => {
	let tokenQuery = req.query.Authorization;
	let tokenGet = req.get('Authorization');
	let token = '';

	if (tokenQuery) {
		token = tokenQuery;
	} else {
		token = tokenGet;
	}

	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Token no valido!!'
				}
			});
		}

		req.user = decoded.user;

		next();
	});
}

module.exports = { 
	checkToken,
	checkAdminRole,
	checkTokenImg
};
