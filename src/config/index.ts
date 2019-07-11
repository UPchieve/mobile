/* 
Root of dev sever
-----------------

For stimulators (ios) use localhost:3000
For emulators, devices, uses IPv4 address

If you get 'Network Error', try:
-Double checking endpoint with request service, like postman
-Disabling firewall
-Setting network to private

*/
const ROOT = '';

// API endpoints
const API = {
    login: `${ROOT}/auth/login`,
    register: `${ROOT}/auth/register`,
};

export default API;
