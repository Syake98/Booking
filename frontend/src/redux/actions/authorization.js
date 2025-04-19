import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';
import { setUser, setIsAuth } from '../actions';

export const authorization = (arg, navigate) => async dispatch => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST });

		const { error, user } = await request(URLS.LOGIN, 'POST', arg);

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error });
			return;
		}

		dispatch(setUser(user));
		dispatch(setIsAuth(true));
		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS });
		navigate('/');
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error });
	}
};
