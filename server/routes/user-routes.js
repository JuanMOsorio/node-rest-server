const express = require('express');
const app = express();

const User = require('../models/user-model');

// Encriptando password.
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/user', (req, res) => {

	let start = req.query.start || 0;
	start = Number(start);
	let limit = req.query.limit || 5;
	limit = Number(limit);

	User.find({ status: true }, 'name email role status google img')
		.skip(start)
		.limit(limit)
		.exec((err, users) => {
			// Manejando el error.
			if (err) {
				return res.status(400).json({
					ok: false,
					err: err
				});
			}

			// Conteo de usuarios.
			User.count({ status: true }, (err, count) => {
				res.json({
					count,
					ok: true,
					users
				});
			});

		});
});

app.post('/user', (req, res) => {
	let body = req.body;

	let user = new User({
		name: body.name,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role
	});
	

	// APLICACIÓN DEL SCHEMA.
	user.save((err, userDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err: err
			});
		}

		// userDB.password = null;

		res.json({
			ok: true,
			user: userDB
		});
	});
});

app.put('/user/:id', (req, res) => {
	let id = req.params.id;

	// Validaciones con underscore.
	let body = _.pick(req.body, [
		'name',
		'email',
		'img',
		'role',
		'status'
	]);

	User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			user: userDB
		});
	});
	
});

app.delete('/user/:id', (req, res) => {
	let id = req.params.id;

	let changeStatus = {
		status: false
	};

	// User.findByIdAndRemove(id, (err, userDeleted) => {
	User.findByIdAndUpdate(id, changeStatus, { new: true },(err, userDeleted) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		if (!userDeleted) {
			return res.status(400).json({
				ok: false,
				err:{
					message: 'User not find'
				}
			});	
		}

		res.json({
			ok: true,
			user: userDeleted
		})
	});
});


module.exports = app;