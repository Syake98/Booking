const { Router } = require('express');

const router = Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/bookings', require('./booking'));
router.use('/comments', require('./comment'));
router.use('/users', require('./user'));
router.use('/rooms', require('./room'));

module.exports = router;
