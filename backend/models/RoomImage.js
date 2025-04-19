const { Schema, model } = require('mongoose');
const validator = require('validator');

const roomImageSchema = new Schema(
	{
		room_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Room',
		},
		image_url: {
			type: String,
			required: true,
			validate: {
				validator: (value) => validator.isURL(value),
				message: 'Некорректный формат URL',
			},
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true },
);

const RoomImage = model('RoomImage', roomImageSchema);

module.exports = RoomImage;
