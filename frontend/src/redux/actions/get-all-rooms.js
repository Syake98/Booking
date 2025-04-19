import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';

export const getAllRooms = () => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_ROOMS_LOADING });
	try {
		const { data, error } = await request(URLS.ROOMS, 'GET');

		if (error) {
			dispatch({ type: ACTION_TYPE.RESET_ROOMS });
			return;
		}
		dispatch({ type: ACTION_TYPE.SET_ROOMS, payload: data });
		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS, payload: false });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.RESET_ROOMS });
	}
};
