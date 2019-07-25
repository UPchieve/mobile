// Action constants

const ACTION_TYPES = {
	TOGGLE_MENU: 'TOGGLE_MENU',
	SAVE_USER: 'SAVE_USER',
	MODAL_LAUNCHED: 'MODAL_LAUNCHED',
	SESSION_STARTED: 'SESSION_STARTED',
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

export function sessionStarted(topic: string) {
	return {
		type: ACTION_TYPES.SESSION_STARTED,
		topic,
	};
}
