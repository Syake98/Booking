const mapUser = require('./mapUser');
const mapRoom = require('./mapRoom');

module.exports = function (booking) {
	return {
		id: booking._id,
		room: mapRoom(booking.room),
		user: mapUser(booking.user),
		startDate: booking.startDate,
		endDate: booking.endDate,
		totalPrice: booking.totalPrice,
		guestsAmount: booking.guestsAmount,
	};
};
