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
  // const userid = payload['sub'];

  // Obteniendo la información del payload.
  return {
  	name: payload.name,
  	email: payload.email,
  	img: payload.img,
  	google: true
  };
}

app.post('/google', async (req, res) => {
	// Obtener el token.
	let token = req.body.idtoken;

	// Lamando la funcion de verificar.
	// Obteniendo la información del usuario
	let googleUser = await verify(token)
		.catch(err => {
		 return	res.status(403).json({
				ok: false,
				err
			});
		});


	// Validaciones para el usuario de Google.
	User.findOne({ email: googleUser.email }, (err, userDB) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		// Verificar si el usuario exite.
		if (userDB) {
			// Verficar si el usario se a autenticado con google.
			if (userDB.google === false) {
				return res.status(400).json({
					ok: false,
					err: {
						message: 'Debe usar la autenticación normal!'
					}
				});
			} else {
				// Generando un token para el usuario.
				let token = jwt.sign({
					user: userDB
				}, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

				// Retornando la información del usuario.
				return res.json({
					ok: true,
					user: userDB,
					token
				});
			}
		} else {
			// Si el usario no existe en la base de datos.
			// Se autentica por primera vez.

			let user = new User();

			user.name = googleUser.name;
			user.email = googleUser.email;
			user.img = googleUser.img;
			user.google = true;
			user.password = ':)';
			
			user.save((err, userDB) => {
				// Si hay un error.
				if (err) {
					return res.status(500).json({
						rok: false,
						err
					});
				}

				// Retornar la información del nuenvo usuario de la base de datos.

				// Generando un token para el usuario.
				let token = jwt.sign({
					user: userDB
				}, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

				// Retornando la información del usuario.
				return res.json({
					ok: true,
					user: userDB,
					token
				});

			});
		}

	});

});

module.exports = app;