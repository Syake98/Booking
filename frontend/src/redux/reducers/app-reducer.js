import { ACTION_TYPE } from '../actions';

const initialAppState = {
	isLoading: false,
	error: null,
	isAuth: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
			};
		case ACTION_TYPE.REQUEST_ERROR:
			return {
				...initialAppState,
				isLoading: false,
				error: action.payload,
			};
		case ACTION_TYPE.ISAUTH:
			return {
				...state,
				isLoading: false,
				error: false,
				isAuth: true,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isLoading: false,
				isAuth: false,
			};
		default:
			return state;
	}
};
