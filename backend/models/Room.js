const { Schema, model } = require('mongoose');
const validator = require('validator');

const roomSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: [0, 'Цена должна быть больше 0'],
		},
		capacity: {
			type: Number,
			required: true,
			min: [1, 'Количество человек должно быть больше 1'],
		},
		roomsAmount: {
			type: Number,
			required: true,
			min: [0, 'Количество комнат должно быть больше 0'],
		},
		area: {
			type: Number,
			required: true,
			min: [0, 'Площадь номера должна быть больше 0'],
		},
		features: {
			tv: Boolean,
			fridge: Boolean,
			conditioner: Boolean,
			wifi: Boolean,
			microwave: Boolean,
			bath: Boolean,
		},
		images: [
			{
				type: String,
				validate: validator.isURL,
			},
		],
		description: {
			type: String,
			required: true,
		},
		number: {
			type: Number,
			required: true,
		},
		floor: {
			type: Number,
			required: true,
			min: [0, 'Этаж должен быть больше 0'],
		},
		rating: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
				score: {
					type: Number,
					required: true,
				},
			},
		],
		averageRating: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

roomSchema.pre('save', async function (next) {
	const room = this;
	if (room.rating.length > 0) {
		const sum = room.rating.reduce((acc, rating) => acc + rating.score, 0);
		room.averageRating = Math.round((sum / room.rating.length) * 100) / 100;
	} else {
		room.averageRating = 0;
	}
	next();
});

const Room = model('Room', roomSchema);

module.exports = Room;
