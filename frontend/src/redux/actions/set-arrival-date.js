import { ACTION_TYPE } from './action-type';

export const setArrivalDate = payload => {
	return {
		type: ACTION_TYPE.SET_ARRIVAL_DATE,
		payload,
	};
};
