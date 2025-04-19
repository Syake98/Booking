const { Schema, model } = require('mongoose');
const validator = require('validator');
const ROLES = require('../constants/roles');

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: 'Некорректный email',
			},
		},
		password: {
			type: String,
			required: true,
			minlength: [6, 'Пароль должен быть не менее 6 символов'],
		},
		roleId: {
			type: Number,
			default: ROLES.USER,
		},
	},
	{ timestamps: true },
);

const User = model('User', userSchema);

module.exports = User;
