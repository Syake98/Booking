import { URLS } from '../constants';

export async function request(url, method = 'GET', data, params = '') {
	const res = await fetch(`${URLS.API}${url}/${params}`, {
		method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		credentials: 'include',
		body: data ? JSON.stringify(data) : undefined,
	});
	return await res.json();
}
