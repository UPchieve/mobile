// Combine all reducers

import { combineReducers } from 'redux';

import ui from './ui';
import user from './user';
import session from './session';

export default combineReducers({
	ui,
	user,
	session,
});
