import { URLS } from '../../constants';
import { request } from '../../utils';
import { ACTION_TYPE } from './action-type';

export const deleteBooking = id => async dispatch => {
	try {
		const { error } = await request(URLS.BOOKINGS, 'DELETE', null, id);

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ROOMS_ERROR, payload: error });
			return;
		}

		dispatch({ type: ACTION_TYPE.DELETE_BOOKING, payload: id });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ROOMS_ERROR, payload: error });
	}
};
