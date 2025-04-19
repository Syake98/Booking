import { ACTION_TYPE } from './action-type';

export const setDepartureDate = payload => {
	return {
		type: ACTION_TYPE.SET_DEPARTURE_DATE,
		payload,
	};
};
