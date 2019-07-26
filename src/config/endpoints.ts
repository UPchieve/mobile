import ROOT from './index';

const API = {
	login: `${ROOT}/auth/login`,
	register: `${ROOT}/auth/register`,
	getSession: `${ROOT}/api/session/new`,
	endSession: `${ROOT}/api/session/end`,
};

export default API;
