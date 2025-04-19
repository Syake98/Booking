const mapComment = require('../helpers/mapComment');
const Comment = require('../models/Comment');
const Room = require('../models/Room');
const chalk = require('chalk');

async function getComments(roomId) {
	try {
		const comments = await Comment.find({
			roomId: roomId,
		}).populate('userId');

		return comments.map(mapComment);
	} catch (e) {
		console.log(
			chalk.bgRed(`При получении комментариев что-то пошло не так: ${e.message}`),
		);

		throw new Error(e.message);
	}
}

async function addComment(roomId, userId, comment, rating) {
	if (!roomId || !userId || !comment || !rating) {
		throw new Error('Неверные данные');
	}

	try {
		const newComment = await Comment.create({
			roomId: roomId,
			userId: userId,
			comment: comment,
			rating: rating,
		});

		const room = await Room.findById(roomId);

		room.rating.push({ user: userId, score: rating });

		await room.save();

		await newComment.populate('userId');

		return mapComment(newComment);
	} catch (e) {
		console.log(
			chalk.bgRed(`При добавлении комментария что-то пошло не так: ${e.message}`),
		);
	}
}

async function editComment(id, roomId, userId, editComment, editRating) {
	try {
		const comment = await Comment.findOneAndUpdate(
			{ _id: id },
			{ comment: editComment, rating: editRating },
			{
				new: true,
				runValidators: true,
			},
		).populate('userId');

		const room = await Room.findOne({ _id: roomId });

		room.rating = room.rating.map(rating => {
			if (rating.user.toString() === userId) {
				rating.score = editRating;
			}
			return rating;
		});

		room.save();

		return mapComment(comment);
	} catch (e) {
		console.error(chalk.bgRed(`Ошибка при изменении комментария: ${e.message}`));
	}
}

async function deleteComment(commentId, roomId, userId) {
	try {
		if (!commentId) {
			throw new Error('Такого комментария нет');
		}

		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw new Error('Комментарий не найден');
		}

		const room = await Room.findById(roomId);

		room.rating = room.rating.filter(
			ratingItem => ratingItem.user.toString() !== userId.toString(),
		);

		await room.save();

		return await comment.deleteOne();
	} catch (e) {
		console.error(chalk.bgRed(e.message));
	}
}

module.exports = {
	getComments,
	addComment,
	editComment,
	deleteComment,
};
