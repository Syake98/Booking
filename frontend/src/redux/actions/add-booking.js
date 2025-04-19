import { URLS } from '../../constants';
import { request } from '../../utils';
import { ACTION_TYPE } from './action-type';

export const addBooking = (arg, navigate) => async dispatch => {
	try {
		const { data, error } = await request(URLS.BOOKINGS, 'POST', arg);
		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ROOM_ERROR, payload: error });
			return;
		}
		dispatch({ type: ACTION_TYPE.ADD_BOOKING, payload: data });
		navigate(`/user-bookings`);
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ROOM_ERROR, payload: error });
	}
};
