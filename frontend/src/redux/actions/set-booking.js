import { ACTION_TYPE } from './action-type';

export const setBooking = (...payload) => {
	console.log(...payload);
	return {
		type: ACTION_TYPE.SET_BOOKING,
		...payload,
	};
};
