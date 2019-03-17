const express = require('express');
const fileupload =require('express-fileupload');
const app = express();

const User = require('../models/user-model');

app.use(fileupload({ useTempFile: true }));

app.put('/upload/:type/:id', (req, res) => {

	let type = req.params.type;
	let id = req.params.id;

	// Si no hay archivos
	if (!req.files) {
		return res.status(400).json({
			ok: false,
			err: {
				message: 'No hay archivos para subir.'
			}
		});
	}

	// Validar tipo de archivo.
	let validTypes = ['products', 'users'];
	if (validTypes.indexOf(type) < 0) {
		return res.status(400).json({
			ok: false,
			err: {
				messsage: `Los tipos permitidos son ${ validTypes.join(', ') }`,
				type
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

	// Cambiando el nombre a archivo.
	let fileName = `${ id }-${ new Date().getMilliseconds() }.${ extention }`;

	// Ruta de donde se almecenra el archivo.
	file.mv(`uploads/${ type }/${ fileName }`, (err) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		// La imagen se ha cargado al sistema.
		userImage(id, res, fileName);
		
	});

});

function userImage(id, res, fileName) {
	User.findById(id, (err, userDB) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if (!userDB) {
			return res.status(400).json({
				ok: false,
				err: {
					messsage: 'El usario no exite!'
				}
			});
		}

		// Cambiando la imagen del usuario.
		userDB.img = fileName;

		// Guardando usuario.
		userDB.save((err, userUpdated) => {
			res.json({
				ok: true,
				user: userUpdated,
				img: fileName
			});
		});

	});

}

function imageProduct() {

}

module.exports = app;
