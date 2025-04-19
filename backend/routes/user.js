const { Router } = require('express');
const { getUser } = require('../controllers/user');
const ROLES = require('../constants/roles');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');

const router = Router({ mergeParams: true });

router.get('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const user = await getUser(req.params.id);

	res.json({ data: user, error: null });
});

module.exports = router;
