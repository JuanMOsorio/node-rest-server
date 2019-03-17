const express = require('express');

const app = express();

// Usando Rutas.
app.use(require('./user-routes'));
app.use(require('./category-routes'));
app.use(require('./product-routes'));

// Ruta de Login.
app.use(require('./login'));

module.exports = app;