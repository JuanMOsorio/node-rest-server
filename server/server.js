require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Usando Rutas.
app.use(require('./routes/user-routes'));

// Conexion con mongo db
mongoose.connect('mongodb://localhost:27017/coffe', (err, res) => {
	if (err) throw err;
	console.log('DB online');
});

app.listen(process.env.PORT, () => {
	console.log('Ecuchando en puerto', process.env.PORT);
});