import { URLS } from '../../constants';
import { request } from '../../utils';
import { ACTION_TYPE } from './action-type';

export const deleteRoom = (id, navigate) => async dispatch => {
	try {
		const { error } = await request(URLS.ROOMS, 'DELETE', null, id);

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ROOM_ERROR, payload: error });
			return;
		}

		dispatch({ type: ACTION_TYPE.RESET_ROOM });
		navigate('/');
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ROOM_ERROR, payload: error });
	}
};
