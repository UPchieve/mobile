// Action constants

const ACTION_TYPES = {
	TOGGLE_MENU: 'TOGGLE_MENU',
	SAVE_USER: 'SAVE_USER',
};

export { ACTION_TYPES };

export function toggleMenu(text) {
	return { type: ACTION_TYPES.TOGGLE_MENU, text };
}

export function saveUser(user) {
	return { 
		type: ACTION_TYPES.SAVE_USER,
		user
	};
}
