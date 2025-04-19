import { ACTION_TYPE } from './action-type';

export const setIsAuth = payload => {
	return {
		type: ACTION_TYPE.ISAUTH,
		payload,
	};
};
