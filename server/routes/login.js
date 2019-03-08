const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');

const app = express();

// RUTAS PARA EL LOGIN.
app.post('/login', (req, res) => {
	res.json({
		ok: true
	})
});

module.exports = app;