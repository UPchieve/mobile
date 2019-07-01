const AUTH_ROOT = 'Auth';
const API_ROOT = 'https://app.upchieve.org/api';

export default {
	login(creds) {
		// Check if credentials exist
		const { email, password } = creds
		if (
			!email ||
      		!password 
		){
			return undefined
		}

		// Make API call
		// fetch('https://app.upchieve.org/auth/login', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		email,
		// 		password
		// 	}),
		// })
		// 	.then(response => response.json())
		// 	.then(responseJson => {
		// 		return responseJson.movies;
		// 	})
		// 	.catch(error => {
		// 		console.error(error);
		// 	});

	}
}