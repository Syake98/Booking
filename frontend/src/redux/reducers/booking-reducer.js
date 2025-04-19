import { ACTION_TYPE } from '../actions';

const initialBookingState = {
	id: null,
	roomId: '',
	userId: '',
	startDate: '',
	endDate: '',
	totalPrice: '',
	error: null,
};

export const bookingReducer = (state = initialBookingState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_BOOKING:
		case ACTION_TYPE.EDIT_BOOKING:
		case ACTION_TYPE.SET_BOOKING:
			return {
				...state,
				...action.payload,
				error: null,
			};
		case ACTION_TYPE.DELETE_BOOKING:
			return {
				...initialBookingState,
			};
		case ACTION_TYPE.REQUEST_BOOKING_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
