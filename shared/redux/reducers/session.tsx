// Reducer for storing user data

const initialState = {
	// topic: null,
	sessionId: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SESSION_STARTED':
			return {
				...state,
				sessionId: action.sessionId || state.sessionId,
				// topic: action.topic || state.topic,
			};
		case 'SESSION_ENDED':
			return {
				...state,
				sessionId: null,
			};
		default:
			return state;
	}
};
