import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';

export const getReservedDates = (id, roomId) => async dispatch => {
	try {
		const { data, error } = await request(
			URLS.BOOKINGS,
			'POST',
			{ id, roomId },
			'reservedDates',
		);
		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ROOMS_ERROR, payload: error });
			return;
		}
		dispatch({ type: ACTION_TYPE.SET_RESERVED_DATES, payload: data });
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ROOMS_ERROR, payload: error });
	}
};
