import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';

export const getFilteredRooms = searchData => async dispatch => {
	dispatch({ type: ACTION_TYPE.SET_ROOMS_LOADING });
	try {
		const { data, error } = await request(URLS.ROOMS, 'POST', searchData);

		if (error) {
			dispatch({ type: ACTION_TYPE.RESET_ROOMS });
			return;
		}
		dispatch({ type: ACTION_TYPE.SET_ROOMS, payload: data });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.RESET_ROOMS });
	}
};
