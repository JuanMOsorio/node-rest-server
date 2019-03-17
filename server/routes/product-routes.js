const express = require('express');
const { checkToken } =require('../middlewares/autentication');

const app = express();
let Product = require('../models/products-model');

//=============================
// Obtener todos los productos.
//=============================
app.get('/product', checkToken, (req, res) => {
	// trate todos los productos
	// con el populate: user and category
	// paginado

	let start = req.query.start || 0;
	start = Number(start);
	let limit = req.query.limit || 5;
	limit = Number(limit);

	Product.find({ available: true })
		.skip(start)
		.limit(limit)
		.populate('user', 'name email')
		.populate('category', 'description')
		.exec((err, productDB) => {

			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}

			Product.count({ available: true }, (err, count) => {
				res.json({
					count,
					ok: true,
					product: productDB
				});
			});

		});

});

//=============================
// Obtener un producto por id.
//=============================
app.get('/product/:id', checkToken, (req, res) => {
	// populate user category

	let id = req.params.id;

	Product.findById(id)
		.populate('user', 'name email')
		.populate('category', 'description')
		.exec((err, productDB) => {

			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}

			if (!productDB) {
				return res.status(400).json({
					ok: false,
					err: {
						message: 'El id es incorrecto'
					}
				});
			}

			res.json({
				ok: true,
				product: productDB
			});

	});
});

//=============================
// Buscar productos.
//=============================
app.get('/product/search/:term', checkToken, (req, res) => {

	let term = req.params.term;

	// Expreción regular
	let regexp = new RegExp(term, 'i');

	Product.find({ name: regexp })
		.populate('category', 'description name')
		.exec((err, products) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				products
			})
		});
});


//=============================
// Crear un nuevo producto.
//=============================
app.post('/product', checkToken, (req, res) => {
	// grabar el user
	// grabar una categoria del listado
	let body = req.body;

	let product = new Product({
		name: body.name,
		priceUni: body.priceUni,
		description: body.description,
		available: body.available,
		category: body.category,
		user: req.user._id
	})

	product.save((err, productDB) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		res.status(201).json({
			ok: true,
			product: productDB
		});
	});
});

//=============================
// Actualizar un nuevo producto
//=============================
app.put('/product/:id', checkToken, (req, res) => {
	let id = req.params.id;
	let body = req.body;

	Product.findById(id, (err, productDB) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if (!productDB) {
			return res.status(500).json({
				ok: false,
				err: {
					message: 'El producto no existe'
				}
			});
		}

		productDB.name = body.name;
		productDB.priceUni = body.priceUni;
		productDB.description = body.description;
		productDB.available = body.available;
		productDB.category = body.category;

		productDB.save((err, productUpdated) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				product: productUpdated
			});
		});

	});

});

//=============================
// Borrar un producto.
//=============================
app.delete('/product/:id', checkToken, (req, res) => {
	// Cambiar el estado del producto
	// para que no se visible.
	let id = req.params.id;

	let changeStatus = {
		available: false
	};

	// User.findByIdAndRemove(id, (err, userDeleted) => {
	Product.findByIdAndUpdate(id, changeStatus, { new: true },(err, productDeleted) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if (!productDeleted) {
			return res.status(400).json({
				ok: false,
				err:{
					message: 'Product not find'
				}
			});	
		}

		res.json({
			ok: true,
			product: productDeleted,
			message: 'Producto borrado!!'
		});
	});

});

module.exports = app;
