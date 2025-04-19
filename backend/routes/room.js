const { Router } = require('express');
const {
	getAllRooms,
	getFilteredRooms,
	addRoom,
	editRoom,
	deleteRoom,
} = require('../controllers/room');
const ROLES = require('../constants/roles');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
	const rooms = await getAllRooms();

	res.json({ data: rooms, error: null });
});

router.post('/', async (req, res) => {
	const rooms = await getFilteredRooms(req.body);

	res.json({ data: rooms, error: null });
});

router.post('/addRoom', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const room = await addRoom(req.body);

	res.json({ data: room, error: null });
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const room = await editRoom(req.params.id, req.body);
	res.json({ data: room, error: null });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const result = await deleteRoom(req.params.id);

	res.json({ data: result, error: null });
});

module.exports = router;
