import { ACTION_TYPE } from './action-type';

export const setRoom = payload => {
	return {
		type: ACTION_TYPE.SET_ROOM,
		payload,
	};
};
