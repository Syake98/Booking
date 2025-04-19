import { ACTION_TYPE } from './action-type';

export const setComments = payload => {
	return {
		type: ACTION_TYPE.SET_COMMENTS,
		payload,
	};
};
