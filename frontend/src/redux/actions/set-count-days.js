import { ACTION_TYPE } from './action-type';

export const setCountDays = payload => {
	return {
		type: ACTION_TYPE.SET_COUNT_DAYS,
		payload,
	};
};
