import { ACTION_TYPE } from './action-type';

export const setGuestsAmount = payload => {
	return {
		type: ACTION_TYPE.SET_GUESTS_AMOUNT,
		payload,
	};
};
