import { addDays } from 'date-fns';
import { ACTION_TYPE } from '../actions';

const initialSearchState = {
	arrivalDate: addDays(new Date(), 1),
	departureDate: addDays(new Date(), 2),
	countDays: 1,
	guestsAmount: 1,
};

export const searchReducer = (state = initialSearchState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_SEARCH:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.SET_ARRIVAL_DATE:
			return {
				...state,
				arrivalDate: payload,
			};
		case ACTION_TYPE.SET_DEPARTURE_DATE:
			return {
				...state,
				departureDate: payload,
			};
		case ACTION_TYPE.SET_COUNT_DAYS:
			return {
				...state,
				countDays: payload,
			};
		case ACTION_TYPE.SET_GUESTS_AMOUNT:
			return {
				...state,
				guestsAmount: payload,
			};
		default:
			return state;
	}
};
