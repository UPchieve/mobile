import io from 'socket.io-client';
import API from '../src/config/endpoints';

const socket = io(API.sockets, { jsonp: false });

export default socket;
