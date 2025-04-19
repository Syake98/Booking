const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
	{
		roomId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Room',
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		comment: {
			type: String,
			required: true,
			min: [3, 'Слишком короткий комментарий'],
		},
		rating: {
			type: Number,
			required: true,
			min: [1, 'Рейтинг должен быть от 1 до 5'],
			max: [5, 'Рейтинг должен быть от 1 до 5'],
		},
	},
	{ timestamps: true },
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
