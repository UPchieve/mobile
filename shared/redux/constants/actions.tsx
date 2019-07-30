import axios from 'axios';
import API from '../../../src/config/endpoints';
import { TouchableOpacity } from 'react-native';

// Action constants

const ACTION_TYPES = {
	TOGGLE_MENU: 'TOGGLE_MENU',
	SAVE_USER: 'SAVE_USER',
	MODAL_LAUNCHED: 'MODAL_LAUNCHED',
	SESSION_STARTED: 'SESSION_STARTED',
	SESSION_ENDED: 'SESSION_ENDED',
};

export { ACTION_TYPES };

// Action Creators

// UI
export function toggleMenu() {
	return { type: ACTION_TYPES.TOGGLE_MENU };
}
export function modalLaunched(modal: string) {
	return {
		type: ACTION_TYPES.MODAL_LAUNCHED,
		modal,
	};
}

// User
export function saveUser(user) {
	return {
		type: ACTION_TYPES.SAVE_USER,
		user,
	};
}

// Session
interface topic {
	type: string;
	subTopic: string;
}
export function getSession(topic: topic) {
	return dispatch => {
		return axios
			.post(API.getSession, {
				sessionType: topic.type,
				sessionSubTopic: topic.subTopic,
			})
			.then(res => {
				return dispatch(sessionStarted(res.data.sessionId, topic));
			})
			.catch(err => {
				console.error(err);
			});
	};
}
export function sessionStarted(sessionId: string, topic: string) {
	return {
		type: ACTION_TYPES.SESSION_STARTED,
		sessionId,
		topic,
	};
}
export function endSession() {
	return dispatch => {
		axios
			.post(API.endSession)
			.then(res => {
				dispatch(sessionEnded());
			})
			.catch(err => {
				console.error(err);
			});
	};
}
export function sessionEnded() {
	return {
		type: ACTION_TYPES.SESSION_ENDED,
	};
}
