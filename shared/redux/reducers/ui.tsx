// UI reducer

import { ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
	menuOpen: false,
};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case ACTION_TYPES.TOGGLE_MENU:
			return {
                ...state,
                menuOpen: !state.menuOpen
			};
		default:
			return state;
	}
};
