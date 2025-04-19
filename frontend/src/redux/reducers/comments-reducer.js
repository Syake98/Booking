import { ACTION_TYPE } from '../actions';

const initialCommentsState = {
	comments: [],
	error: null,
};

export const commentsReducer = (state = initialCommentsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload],
				error: null,
			};
		case ACTION_TYPE.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment.id !== action.payload),
				error: null,
			};
		case ACTION_TYPE.EDIT_COMMENT:
			return {
				...state,
				comments: state.comments.map(comment =>
					comment.id === action.payload.id ? action.payload : comment,
				),
				error: null,
			};
		case ACTION_TYPE.SET_COMMENTS:
			return {
				...state,
				comments: action.payload,
				error: null,
			};
		case ACTION_TYPE.RESET_COMMENTS:
			return {
				...initialCommentsState,
			};
		case ACTION_TYPE.REQUEST_COMMENT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
