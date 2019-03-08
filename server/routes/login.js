const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');

const app = express();

// RUTAS PARA EL LOGIN.
app.post('/login', (req, res) => {

	// Obtener el body.
	let body = req.body;

	User.findOne({ email: body.email }, (err, userDB) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}
		if (!userDB) {
			return res.status(400).json({
				ok: false,
				err: {
					message: '(User)  password incorrectos!!'
				}
			});
		}
		if (!bcrypt.compareSync(body.password, userDB.password)) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'User (password) incorrectos!!'
				}
			});
		}
		res.json({
			ok: true,
			user: userDB,
			token: '123'
		});
	});
});

module.exports = app;