// Combine all reducers

import { combineReducers } from 'redux';

import ui from './ui';
import user from './user';

export default combineReducers({
	ui,
	user,
});
