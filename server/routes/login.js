const express = require('express');
const bcrypt = require('bcrypt');

// JTW.
const jwt = require('jsonwebtoken');

// Autenticacion de google para node.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// Modelos de Mongo
const User = require('../models/user-model');

// Intancia de express
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

		// Generando Token.
		let token = jwt.sign({
			user: userDB,
		}, process.env.SEED , { expiresIn: process.env.EXPIRATION_TOKEN } );

		res.json({
			ok: true,
			user: userDB,
			token
		});
	});
});


// Configuraciones de google.
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  console.log(payload.name);
  console.log(payload.email);
  console.log(payload.picture);
}

app.post('/google', (req, res) => {
	// Obtener el token.
	let token = req.body.idtoken;

	// Lamando la funcion de verificar.
	verify(token);

	res.json({
		token
	});
});

module.exports = app;