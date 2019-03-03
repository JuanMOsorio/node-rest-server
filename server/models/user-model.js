const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} is not valid!!'
};

let userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'The name is required!!']
	},
	email: {
		type: String,
		unique: true,
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
		type: String,
		// required: [fals, 'The role is required'],
		default: 'USER_ROLE',
		enum: validRoles
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

userSchema.plugin(uniqueValidator, { message:'{PATH} is unique!!' });

module.exports = mongoose.model('User', userSchema);