const express = require('express');
const fileupload =require('express-fileupload');
const app = express();

app.use(fileupload({ useTempFile: true }));

app.put('/upload', (req, res) => {

	// Si no hay archivos
	if (!req.files) {
		return res.status(400).json({
			ok: false,
			err: {
				message: 'No hay archivos para subir.'
			}
		});
	}

	let file = req.files.file;

	// Ruta de donde se almecenra el archivo.
	file.mv('uploads/filename.jpg', (err) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		// Subiendo el archivo.
		res.json({
			ok: true,
			messsage: 'El archivo se subio currectamente!!'
		});
	});

});

module.exports = app;
