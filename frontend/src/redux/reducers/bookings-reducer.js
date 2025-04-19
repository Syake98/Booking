import { ACTION_TYPE } from '../actions';

const initialBookingsState = {
	bookings: [],
	reservedDates: [],
	error: null,
};

export const bookingsReducer = (state = initialBookingsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_BOOKINGS:
			return {
				...state,
				bookings: action.payload,
				error: null,
			};
		case ACTION_TYPE.DELETE_BOOKING:
			return {
				...state,
				bookings: state.bookings.filter(booking => booking.id !== action.payload),
				error: null,
			};
		case ACTION_TYPE.SET_RESERVED_DATES:
			return {
				...state,
				reservedDates: action.payload,
			};
		case ACTION_TYPE.RESET_BOOKINGS:
			return {
				...initialBookingsState,
			};
		case ACTION_TYPE.REQUEST_BOOKINGS_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
