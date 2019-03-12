require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

// Importar el path para la ruta del localhost de public
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Usando Rutas de index.js.
app.use(require('./routes'));

// Habilitar la carpeta
app.use(express.static(path.resolve(__dirname,'../public')));

// Conexion con mongo db
mongoose.connect(process.env.URLDB,
	{ useNewUrlParser: true, useCreateIndex: true },
 (err, res) => {
	if (err) throw err;
	console.log('DB online');
});

app.listen(process.env.PORT, () => {
	console.log('Ecuchando en puerto', process.env.PORT);
});