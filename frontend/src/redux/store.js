import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import {
	appReducer,
	bookingReducer,
	bookingsReducer,
	commentsReducer,
	roomReducer,
	roomsReducer,
	searchReducer,
	userReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	booking: bookingReducer,
	bookings: bookingsReducer,
	comments: commentsReducer,
	room: roomReducer,
	rooms: roomsReducer,
	search: searchReducer,
	user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
