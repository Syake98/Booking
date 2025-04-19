const { Router } = require('express');
const {
	getComments,
	addComment,
	deleteComment,
	editComment,
} = require('../controllers/comment');
const ROLES = require('../constants/roles');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const Comment = require('../models/Comment');

const router = Router({ mergeParams: true });

router.get('/:roomId', authenticated, async (req, res) => {
	const comments = await getComments(req.params.roomId);

	res.json({ data: comments, error: null });
});

router.post('/', authenticated, hasRole([ROLES.USER]), async (req, res) => {
	const comment = await addComment(
		req.body.roomId,
		req.body.userId,
		req.body.comment,
		req.body.rating,
	);

	res.json({ data: comment, error: null });
});

router.patch('/:commentId', authenticated, hasRole([ROLES.USER]), async (req, res) => {
	const thisComment = await Comment.findById(req.params.commentId);
	if (!req.user && req.user.id !== thisComment.userId) {
		res.status(401).json({ data: null, error: 'Не авторизован' });
		return;
	}

	const comment = await editComment(
		req.params.commentId,
		req.body.roomId,
		req.body.userId,
		req.body.comment,
		req.body.rating,
	);
	
	res.json({ data: comment, error: null });
});

router.delete(
	'/',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.USER]),
	async (req, res) => {
		const thisComment = await Comment.findById(req.body.commentId);
		if (!req.user && req.user.id !== thisComment.userId) {
			res.status(401).json({ data: null, error: 'Не авторизован' });
			return;
		}

		const result = await deleteComment(
			req.body.commentId,
			req.body.roomId,
			req.body.userId,
		);

		res.json({ data: result, error: null });
	},
);

module.exports = router;
