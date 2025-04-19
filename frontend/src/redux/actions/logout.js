import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';

export const logout = navigate => async dispatch => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST });

		const { error } = await request(URLS.LOGOUT, 'POST');

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error });
			return;
		}

		dispatch({ type: ACTION_TYPE.LOGOUT });
		dispatch({ type: ACTION_TYPE.RESET_USER });
		navigate('/');
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error });
	}
};
