import toast from 'react-hot-toast';

import { URLS } from '../../constants';
import { request } from '../../utils/requests';
import { ACTION_TYPE } from './action-type';
import { setUser, setIsAuth } from '../actions';

export const registration = (arg, navigate) => async dispatch => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST });

		const { error, user } = await request(URLS.REGISTRATION, 'POST', arg);

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error });
			return;
		}

		dispatch(setUser(user));
		dispatch(setIsAuth(true));
		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS });

		toast.success('Вы успешно зарегистрировались');

		navigate('/');
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error });
	}
};
