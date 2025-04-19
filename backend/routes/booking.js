const { Router } = require('express');
const {
	getAllBookings,
	getMyBookings,
	getReservedDates,
	editBooking,
	deleteBooking,
	addBooking,
} = require('../controllers/booking');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const Booking = require('../models/Booking');
const ROLES = require('../constants/roles');

const router = Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const bookings = await getAllBookings();

	res.json({ data: bookings, error: null });
});

router.get('/my', authenticated, hasRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
	const bookings = await getMyBookings(req.user.id);

	res.json({ data: bookings, error: null });
});

router.post(
	'/reservedDates',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.USER]),
	async (req, res) => {
		const reservedDates = await getReservedDates(
			req.user.id,
			req.body.id,
			req.body.roomId,
		);

		res.json({ data: reservedDates, error: null });
	},
);

router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
	const booking = await addBooking({ ...req.body, user: req.user });

	res.json({ data: booking, error: null });
});

router.patch('/', authenticated, hasRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
	const booking = await editBooking(req.body);

	res.json({ data: booking, error: null });
});

router.delete(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.USER]),
	async (req, res) => {
		const thisBooking = Booking.findById(req.params.id);
		if (!req.user && (req.user.roleId !== 0 || req.user.id !== thisBooking.userId)) {
			res.status(401).json({ data: null, error: 'Не авторизован' });
			return;
		}

		const result = await deleteBooking(req.params.id);

		res.json({ data: result, error: null });
	},
);

module.exports = router;
