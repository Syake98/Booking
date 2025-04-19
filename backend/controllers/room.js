const Booking = require('../models/Booking');
const Room = require('../models/Room');
const chalk = require('chalk');

async function getAllRooms() {
	try {
		const rooms = await Room.find();

		if (!rooms.length) {
			throw new Error('Отель ещё строится!');
		}

		const mappedRooms = rooms.map(room => {
			const rating = room.rating.length
				? (
						room.rating.reduce((acc, curr) => acc + curr.score, 0) / room.rating.length
				  ).toFixed(1)
				: 0;
			room._doc.rating = rating;
			return room;
		});
		return mappedRooms;
	} catch (e) {
		console.log(chalk.bgRed(`При получении комнат что-то пошло не так: ${e.message}`));
	}
}

async function getFilteredRooms(data) {
	try {
		const rooms = await Room.find();
		const bookings = await Booking.find();
		const filteredBookings = bookings.filter(booking => {
			return !(
				new Date(data.departureDate) < booking.startDate ||
				new Date(data.arrivalDate) > booking.endDate
			);
		});

		const filteredRooms = rooms.filter(room => {
			const isRoomBooked = filteredBookings.some(
				booking => booking.room.toString() === room.id.toString(),
			);

			const isCapacityEnough = room.capacity >= data.guestsAmount;

			return !isRoomBooked && isCapacityEnough;
		});
		return filteredRooms;
	} catch (e) {
		console.log(chalk.bgRed(`При получении комнат что-то пошло не так: ${e.message}`));
	}
}

async function addRoom(roomData) {
	try {
		const newRoom = await Room.create(roomData);

		return newRoom;
	} catch (e) {
		console.log(chalk.bgRed(`При добавлении комнаты что-то пошло не так: ${e.message}`));
	}
}

async function editRoom(id, data) {
	try {
		const room = await Room.findOneAndUpdate({ _id: id }, data, {
			new: true,
			runValidators: true,
		});

		if (!room) {
			throw new Error('Комната с указанным ID не найдена');
		}

		return room;
	} catch (e) {
		console.error(chalk.bgRed(`Ошибка при обновлении комнаты: ${e.message}`));
	}
}

async function deleteRoom(id) {
	try {
		if (!id) {
			throw new Error('Неверный id');
		}
		return Room.deleteOne({ _id: id });
	} catch (e) {
		console.error(chalk.bgRed(`Такого номера нет: ${e.message}`));
	}
}

module.exports = {
	getAllRooms,
	getFilteredRooms,
	addRoom,
	editRoom,
	deleteRoom,
};
