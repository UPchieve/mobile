// UI reducer

import { ACTION_TYPES } from '../constants/actions';

const initialState = {
	menuOpen: false,
	modal: null,
};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case ACTION_TYPES.TOGGLE_MENU:
			// Update state of menu on dashboard
			return {
				...state,
				menuOpen: !state.menuOpen,
			};
		case ACTION_TYPES.MODAL_LAUNCHED:
			// Update current opened modal so TopBar can close them accordingly
			return {
				...state,
				modal: action.modal,
			};
		default:
			return state;
	}
};
