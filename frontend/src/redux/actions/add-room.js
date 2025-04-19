import { URLS } from '../../constants';
import { request } from '../../utils';
import { ACTION_TYPE } from './action-type';

export const addRoom = (arg, navigate) => async dispatch => {
	try {
		const { data, error } = await request(URLS.ROOMS, 'POST', arg, 'addRoom');
		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ROOM_ERROR, payload: error });
			return;
		}
		dispatch({ type: ACTION_TYPE.ADD_ROOM, payload: data });
		navigate(`/rooms`);
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ROOM_ERROR, payload: error });
	}
};
