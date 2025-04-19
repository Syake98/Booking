import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Pencil, Star, Trash2, User } from 'lucide-react';

import { ROLES } from '../../../../constants';
import { deleteComment, editComment } from '../../../../redux/actions';
import { selectUserEmail, selectUserRole } from '../../../../redux/selector';
import { Input } from '../../../';
import { handleNumberChange } from '../../../../utils';

import styles from './Comment.module.css';

export const Comment = comment => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const userEmail = useSelector(selectUserEmail);

	const [isEditing, setIsEditing] = useState(false);
	const [newComment, setNewComment] = useState(comment.comment);
	const [newRating, setNewRating] = useState(comment.rating);

	const commentDate = new Date(comment.commentDate).toISOString().split('T')[0];

	const isAdmin = userRole === ROLES.ADMIN;
	const isUser = userEmail === comment.user.email;

	const onSaveComment = () => {
		dispatch(
			editComment({
				id: comment.id,
				roomId: comment.roomId,
				userId: comment.user.id,
				comment: newComment,
				rating: newRating,
			}),
		);
		setIsEditing(false);
	};

	const onDeleteComment = () => {
		dispatch(deleteComment(comment.id, comment.roomId, comment.user.id));
	};

	return (
		<div className={styles.comment}>
			<div className={styles.commentHeader}>
				<div className={styles.commentContent}>
					<User size={20} />
					<span>{comment.user.email}</span>
					{isEditing ? (
						<Input
							id="rating"
							name="rating"
							type="number"
							value={newRating}
							onChange={e =>
								handleNumberChange({ e, setValue: setNewRating, min: 1, max: 5 })
							}
							disabledlabel={'none'}
						/>
					) : (
						<span>{comment.rating}</span>
					)}
					<Star size={20} />
					<span>{commentDate}</span>
				</div>
				<div className={styles.commentEdit}>
					{!isEditing ? (
						isUser && <Pencil size={20} onClick={() => setIsEditing(true)} />
					) : (
						<Check size={20} onClick={onSaveComment} />
					)}
					{(isUser || isAdmin) && <Trash2 size={20} onClick={onDeleteComment} />}
				</div>
			</div>
			{isEditing ? (
				<textarea
					className={styles.commentTextarea}
					name="comment"
					value={newComment}
					placeholder="Новый комментарий..."
					onChange={({ target }) => setNewComment(target.value)}
				></textarea>
			) : (
				<div className={styles.commentText}>{comment.comment}</div>
			)}
		</div>
	);
};
