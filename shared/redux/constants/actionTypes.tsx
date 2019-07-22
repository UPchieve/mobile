// Action constants

const ACTION_TYPES = {
	TOGGLE_MENU: 'TOGGLE_MENU',
};

export { ACTION_TYPES };

export function toggleMenu(text) {
	return { type: ACTION_TYPES.TOGGLE_MENU, text };
}
