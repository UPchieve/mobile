// Action constants

const ACTION_TYPES = {
	TOGGLE_MENU: 'TOGGLE_MENU',
	SAVE_USER: 'SAVE_USER',
	MODAL_LAUNCHED: 'MODAL_LAUNCHED',
};

export { ACTION_TYPES };

export function toggleMenu() {
	return { type: ACTION_TYPES.TOGGLE_MENU };
}

export function saveUser(user) {
	return {
		type: ACTION_TYPES.SAVE_USER,
		user,
	};
}

export function modalLaunched(modal: string) {
	return {
		type: ACTION_TYPES.MODAL_LAUNCHED,
		modal,
	};
}
