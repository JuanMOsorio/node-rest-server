const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

categorySchema.plugin(uniqueValidator, { message: '{PATH} is unique!!' });

module.exports = mongoose.model('Category', categorySchema);
