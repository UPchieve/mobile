import ROOT from './index';

const SERVER = `http://${ROOT}:3000`;
const SOCKETS = `http://${ROOT}:3001`;

const API = {
	root: SERVER,
	sockets: SOCKETS,
	login: `${SERVER}/auth/login`,
	checkCred: `${SERVER}/auth/register/checkcred`,
	register: `${SERVER}/auth/register`,
	getSession: `${SERVER}/api/session/new`,
	endSession: `${SERVER}/api/session/end`,
};

export default API;
