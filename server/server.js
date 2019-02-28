const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/user', (req, res) => {
	res.json('Get User');
});

app.post('/user', (req, res) => {
	let body = req.body;

	res.json({ body });
});

app.put('/user/:id', (req, res) => {
	let id = req.params.id;

	res.json({
		id
	});
});

app.delete('/user', (req, res) => {
	res.json('Delete User');
});

app.listen(3000, () => {
	console.log('Ecuchando en puerto', 3000);
});