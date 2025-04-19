const mapBooking = require('../helpers/mapBooking');
const Booking = require('../models/Booking');
const chalk = require('chalk');

async function getAllBookings() {
	try {
		const bookings = await Booking.find().populate(['user', 'room']);

		return bookings.map(mapBooking);
	} catch (e) {
		console.log(
			chalk.bgRed(`При получении списка всех броней что-то пошло не так: ${e.message}`),
		);
	}
}

async function getMyBookings(user) {
	try {
		const bookings = await Booking.find({ user }).populate(['user', 'room']);
		const mappedBookings = bookings.map(mapBooking);
		return mappedBookings;
	} catch (e) {
		console.log(
			chalk.bgRed(
				`При получении списка броней пользователя что-то пошло не так: ${e.message}`,
			),
		);
	}
}

async function getReservedDates(userId, id, roomId) {
	try {
		const bookings = await Booking.find({ room: roomId });
		const filteredBookings = bookings.filter(booking => {
			return booking.id.toString() !== id.toString();
		});

		const reservedDates = filteredBookings.map(({ startDate, endDate }) => {
			return { startDate: new Date(startDate), endDate: new Date(endDate) };
		});
		return reservedDates;
	} catch (e) {
		console.error(chalk.bgRed(`Ошибка при получении забронированных дат: ${e.message}`));
	}
}

async function addBooking(bookingData) {
	try {
		const booking = await Booking.create(bookingData);
		const bookingWithRoom = await Booking.findById(booking._id)
			.populate(['room', 'user'])
			.exec();
		return mapBooking(bookingWithRoom);
	} catch (e) {
		console.log(chalk.bgRed(`При добавлении брони что-то пошло не так: ${e.message}`));
	}
}

async function editBooking(data) {
	const startDate = new Date(data.newStartDate);
	const endDate = new Date(data.newEndDate);
	const totalPrice = data.newTotalPrice;

	try {
		const booking = await Booking.findById(data.id);
		if (!booking) {
			throw new Error('Бронь не найдена');
		}

		booking.startDate = startDate;
		booking.endDate = endDate;
		booking.totalPrice = totalPrice;

		await booking.validate();

		await booking.save();

		return mapBooking(booking);
	} catch (e) {
		console.error(chalk.bgRed(`Ошибка при обновлении брони: ${e.message}`));
	}
}

async function deleteBooking(id) {
	try {
		const booking = await Booking.findById(id);

		return await booking.deleteOne();
	} catch (e) {
		console.error(chalk.bgRed(`Ошибка при удалении брони: ${e.message}`));
	}
}

module.exports = {
	getAllBookings,
	getMyBookings,
	getReservedDates,
	addBooking,
	editBooking,
	deleteBooking,
};
