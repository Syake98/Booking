const { Router } = require('express');
const { register, login } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = Router({ mergeParams: true });

router.post('/registration', async (req, res) => {
	try {
		const { user, token } = await register(req.body.email, req.body.password);
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.send({ error: null, data: { user: mapUser(user) } });
	} catch (e) {
		res.send({ erroe: e.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password);

		res.cookie('access_token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.post('/logout', (req, res) => {
	res.clearCookie('access_token').send({ error: null, data: null });
});

module.exports = router;
