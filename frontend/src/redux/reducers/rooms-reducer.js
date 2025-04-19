import { ACTION_TYPE } from '../actions';

const initialRoomsState = {
	rooms: [],
	isLoading: false,
};

export const roomsReducer = (state = initialRoomsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ROOMS:
			return {
				...state,
				rooms: action.payload,
				isLoading: false,
			};
		case ACTION_TYPE.SET_ROOMS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.RESET_ROOMS:
			return {
				...initialRoomsState,
			};
		default:
			return state;
	}
};
