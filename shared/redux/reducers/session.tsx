// Reducer for storing user data

import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
	topic: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SESSION_STARTED':
			return {
				...state,
				topic: action.topic || state.topic,
			};
		default:
			return state;
	}
};
