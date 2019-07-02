const AUTH_ROOT = 'https://app.upchieve.org/auth';
const API_ROOT = 'https://app.upchieve.org/api';

export default {
	login(email, password) {
		// Check if credentials exist
		if (!email || !password) {
			return undefined;
		}

		return fetch(`${AUTH_ROOT}/login`, {
			method: 'POST',
			body: { email, password },
		}).then(
			res => {
				const data = { ...res.data };
				if (!data) {
					throw new Error('No user returned from auth service');
				}
			},
			res => {
				context.error = 'Could not login';
				console.log(res);
			}
		);
	},
};
