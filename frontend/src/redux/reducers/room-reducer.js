import { ACTION_TYPE } from '../actions';

const initialRoomState = {
	id: null,
	name: '',
	price: 100,
	capacity: 1,
	roomsAmount: 1,
	area: 1,
	features: {},
	images: [],
	description: '',
	number: 1,
	floor: 1,
	rating: [],
	averageRating: 1,
	error: null,
};

export const roomReducer = (state = initialRoomState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ROOM:
		case ACTION_TYPE.ADD_ROOM:
		case ACTION_TYPE.EDIT_ROOM:
			return {
				...state,
				...action.payload,
				error: null,
			};
		case ACTION_TYPE.REQUEST_ROOM_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.RESET_ROOM:
			return {
				...initialRoomState,
			};
		default:
			return state;
	}
};
