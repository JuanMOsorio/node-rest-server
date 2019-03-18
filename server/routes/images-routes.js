const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/image/:type/:img', (req, res) => {
	let type = req.params.type;
	let img = req.params.img;

	let pathImg = `./uploads/${ type }/${ img }`;

	let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');

	res.sendFile(noImagePath);
});

module.exports = app;
