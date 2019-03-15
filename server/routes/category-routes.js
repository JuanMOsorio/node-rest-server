const express = require('express');
let { checkToken, checkAdminRole } = require('../middlewares/autentication');
let Category = require('../models/category-model');

let app = express();


// Tarea Crear 5 servicios.

// QUE APARESCAN TODAS LAS CAREGORIAS.


//=============================
// Mostrar todas la categorias.
//=============================
app.get('/category', (req, res) => {

	Category.find({}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			categories
		});
	});

});

//=============================
// Mostrar una categoria por id.
//=============================
app.get('/category/:id', (req, res) => {

	let id = req.params.id;
	// Category.findById()
	Category.findById(id, (err, category) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			category
		});
	});
});

//=============================
// Crear nueva categoria.
//=============================
app.post('/category', checkToken, (req, res) => {
	// Regresa la nueva categoria.
	// id del usario en el token
	// req.user._id

	let body = req.body;

	let category = new Category({
		name: body.name,
		description: body.description
	});

	category.save((err, categoryDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			category: categoryDB
		});
	});
});

//=============================
// Actualizar una categoria.
//=============================
app.put('/category/:id', (req, res) => {
	// Actualizar la descripcion de la categoria
	let id = req.params.id;
	let body = req.body;

	Category.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoryDB) => {
		if (err) {
			res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			category: categoryDB
		});
	});

});

//=============================
// Eliminar una categoria.
//=============================
app.delete('/category/:id', [checkToken, checkAdminRole], (req, res) => {
	// Que solo la pueda eliminar un administrador.
	// Pedir el token.
	// Elimina fisicamente.
	// Category.findByIDAndRemove

	let id = req.params.id;

	Category.findByIdAndRemove(id, (err, categoryDeleted) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		if (!categoryDeleted) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Error el usuario no existe!!'
				}
			})
		}

		res.json({
			ok: true,
			category: categoryDB
		});
	});
});

module.exports = app;
