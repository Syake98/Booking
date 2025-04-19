const bcrypt = require('bcrypt');
const chalk = require('chalk');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const mapUser = require('../helpers/mapUser');

async function register(email, password) {
	try {
		if (!email) {
			throw new Error('Необходимо ввести корректный email');
		}

		if (!password) {
			throw new Error('Необходимо ввести пароль');
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await User.create({ email, password: passwordHash });
		const token = generate({ id: user.id });

		console.log(chalk.bgGreen(`Пользователь ${user.email} создан`));
		return { user, token };
	} catch (e) {
		if (e.code === 11000) {
			throw new Error('Такой пользователь существует');
		}
		console.log(chalk.bgRed(`При регистрации пошло что-то не так: ${err.message}`));
		throw new Error(e.message);
	}
}

async function login(email, password) {
	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('Пользователь не найден');
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			throw new Error('Неверный пароль');
		}

		const token = generate({ id: user.id });

		return { user, token };
	} catch (e) {
		console.log(chalk.bgRed(`При авторизации пошло что-то не так: ${e.message}`));
	}
}

async function getUser(id) {
	try {
		const user = await User.findById(id);

		if (!user) {
			throw new Error('Пользователь не найден!');
		}

		return mapUser(user);
	} catch (e) {
		console.log(
			chalk.bgRed(`При получении полоьзователя что-то пошло не так: ${e.message}`),
		);
	}
}

module.exports = {
	register,
	login,
	getUser,
};
