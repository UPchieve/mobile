// Reducer for storing user data

import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
	email: null,
	password: null,
	name: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_USER':
			// Save credentials in AsyncStorage for persistent auth
			if (action.user.credentials.email && action.user.credentials.password) {
				AsyncStorage.multiSet([['email', action.user.credentials.email], ['password', action.user.credentials.password]]);
			}

			// Only save what has been provided to the action
			return {
				...state,
				email: action.user.credentials.email || state.email,
				password: action.user.credentials.password || state.password,
				name: action.user.name || state.name,
			};
		default:
			return state;
	}
};
