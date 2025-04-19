import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';

export const getAllBookings = () => async dispatch => {
	try {
		const { data, error } = await request(URLS.BOOKINGS, 'GET', null);
		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ROOMS_ERROR, payload: error });
			return;
		}

		dispatch({ type: ACTION_TYPE.SET_BOOKINGS, payload: data });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ROOMS_ERROR, payload: error });
	}
};
