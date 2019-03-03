const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
	name: {
		type: String,
		required: [true, 'The name is required!!']
	},
	email: {
		type: String,
		required: [true, 'The email is required']
	},
	password: {
		type: String,
		required: [true, 'The password is required']
	},
	img: {
		type: String,
		required: false
	},
	role: {
		// type: String,
		// required: [fals, 'The role is required'],
		default: 'USER_ROOL'
	},
	status: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: true
	}
});


module.exports = mongoose.model('User', usuarioSchema);