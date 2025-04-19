import { ACTION_TYPE } from '../actions';

const initialUserState = {
	id: null,
	email: '',
	roleId: null,
	createdAt: null,
	updatedAt: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_USER:
			return {
				...initialUserState,
			};
		default:
			return state;
	}
};
