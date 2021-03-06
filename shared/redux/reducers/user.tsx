// Reducer for storing user data

import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
	email: null,
	password: null,
	user: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_USER':
			// Save credentials in AsyncStorage for persistent auth
			if (action.user.credentials.email && action.user.credentials.password) {
				AsyncStorage.multiSet([
					['email', action.user.credentials.email],
					['password', action.user.credentials.password],
				]);
			}

			// Only save what has been provided to the action
			return {
				...state,
				email: action.user.credentials.email || state.email,
				password: action.user.credentials.password || state.password,
				user: action.user.user || state.user,
			};
		default:
			return state;
	}
};
