import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

import { ROLES } from '../../../constants';
import { Comment } from './comment/Comment';
import { addComment, getComments } from '../../../redux/actions';
import { selectComments, selectUserId, selectUserRole } from '../../../redux/selector';
import { Button, Input } from '../../';
import { handleNumberChange } from '../../../utils';

import styles from './RoomCommentsBlock.module.css';

export const RoomCommentsBlock = ({ roomId }) => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const { comments } = useSelector(selectComments);

	const [userRating, setUserRating] = useState(0);
	const [userComment, setUserComment] = useState('');

	const isUser = userRole === ROLES.USER;
	const isUserWroteComment = comments.some(comment => comment.user.id === userId);

	useEffect(() => {
		dispatch(getComments(roomId));
	}, [dispatch]);

	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData(e.target);
		formData.append('roomId', roomId);
		formData.append('userId', userId);

		const dataObj = Object.fromEntries(formData);

		if (userComment.length < 3) {
			toast.error('Пожалуйста, оставьте вменяемый комментарий');
			return;
		} else if (userRating === 0) {
			toast.error('Пожалуйста, поставьте оценку');
			return;
		}

		dispatch(addComment(dataObj));
		setUserComment('');
		setUserRating(0);
	};

	return (
		<div className={styles.roomComments}>
			{isUser && !isUserWroteComment && (
				<form onSubmit={handleSubmit} className={styles.roomAddComment}>
					<textarea
						className={styles.commentText}
						name="comment"
						value={userComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setUserComment(target.value)}
					></textarea>
					<div className={styles.ratingAndSend}>
						<div className={styles.rating}>
							<Input
								id="rating"
								name="rating"
								type="number"
								value={userRating}
								onChange={e =>
									handleNumberChange({ e, setValue: setUserRating, min: 1, max: 5 })
								}
							>
								Оценка
							</Input>
							<Star size={20} color="SandyBrown" />
						</div>
						<Button type="submit" className={styles.commentSendButton}>
							Отправить
						</Button>
					</div>
				</form>
			)}
			<div className={styles.roomCommentsBlock}>
				{comments.length > 0
					? comments.map(comment => <Comment {...comment} key={comment.id} />)
					: 'Нет комментариев'}
			</div>
		</div>
	);
};
