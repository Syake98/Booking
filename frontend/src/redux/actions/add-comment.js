import { URLS } from '../../constants';
import { request } from '../../utils';
import { ACTION_TYPE } from './action-type';

export const addComment = arg => async dispatch => {
	try {
		const { data, error } = await request(URLS.COMMENTS, 'POST', arg);

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_COMMENT_ERROR, payload: error });
			return;
		}

		dispatch({ type: ACTION_TYPE.ADD_COMMENT, payload: data });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_COMMENT_ERROR, payload: error });
	}
};
