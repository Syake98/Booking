import { URLS } from '../../constants';
import { request } from '../../utils';
import { ACTION_TYPE } from './action-type';

export const deleteComment = (commentId, roomId, userId) => async dispatch => {
	try {
		const { error } = await request(
			URLS.COMMENTS,
			'DELETE',
			{ commentId, roomId, userId },
			'',
		);

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_COMMENT_ERROR, payload: error });
			return;
		}

		dispatch({ type: ACTION_TYPE.DELETE_COMMENT, payload: commentId });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_COMMENT_ERROR, payload: error });
	}
};
