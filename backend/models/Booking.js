const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
	{
		room: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Room',
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		startDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (date) {
					return date > new Date();
				},
				message: 'Дата въезда не должна быть раньше нынешней даты',
			},
		},
		endDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (value) {
					return value > this.startDate;
				},
				message: 'Дата выезда не может быть меньше даты заезда',
			},
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		guestsAmount: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	{ timestamps: true },
);

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
