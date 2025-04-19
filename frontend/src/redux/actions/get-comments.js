import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';

export const getComments = roomId => async dispatch => {
	try {
		const { data, error } = await request(URLS.COMMENTS, 'GET', null, roomId);

		if (error) {
			dispatch({ type: ACTION_TYPE.RESET_COMMENTS });
			return;
		}
		
		dispatch({ type: ACTION_TYPE.SET_COMMENTS, payload: data });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.RESET_COMMENTS });
	}
};
