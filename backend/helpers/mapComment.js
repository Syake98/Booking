const mapUser = require('./mapUser');

module.exports = function (comment) {
	return {
		id: comment._id,
		roomId: comment.roomId,
		user: mapUser(comment.userId),
		comment: comment.comment,
		rating: comment.rating,
		commentDate: comment.createdAt,
	};
};
