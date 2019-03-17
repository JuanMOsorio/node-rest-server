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

	// Obtenemos el archivo.
	let file = req.files.file;
	// Obterner la extencion.
	let segmentedName = file.name.split('.');
	let extention = segmentedName[segmentedName.length - 1];
	// Extenciones permitadas
	let validExt = ['png', 'jpg', 'gif', 'jpeg'];

	if (validExt.indexOf(extention) < 0) {
		return res.status(400).json({
			ok: false,
			err: {
				messsage: `Las extenciones validas son ${ validExt.join(', ') }`,
				ext: extention
			}
		});
	}

	// Ruta de donde se almecenra el archivo.
	file.mv(`uploads/${ file.name }`, (err) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		// Subiendo el archivo.
		res.json({
			ok: true,
			messsage: 'El archivo se subio currectamente!!',
		});
	});

});

module.exports = app;
