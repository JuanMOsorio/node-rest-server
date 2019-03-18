const express = require('express');
const fs = require('fs');
const path = require('path');

const { checkToken } = require('../middlewares/autentication');

const app = express();

// CARGAR LAS IMAGENS AL SERVICCIO REST.
app.get('/image/:type/:img', checkToken, (req, res) => {
	let type = req.params.type;
	let img = req.params.img;

	// El path de las imagenes.
	let pathImage = path.resolve(__dirname, `../../uploads/${ type }/${ img }`);

	if (fs.existsSync(pathImage)) {
		// Retorna la imagen.
		res.sendFile(pathImage);
	} else {
		// Si no existe retorna una imagen por defecto.
		let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
		res.sendFile(noImagePath);
	}

});

module.exports = app;
