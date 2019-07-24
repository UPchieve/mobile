// Redux store

import { applyMiddleware, createStore } from 'redux';
import * as thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducers from '../reducers';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

let middlewares = [thunkMiddleware.default];
if (__DEV__) {
	const loggerMiddleware = createLogger();
	middlewares = [...middlewares, loggerMiddleware];
}

export default () => {
	let store = createStore(persistedReducer, applyMiddleware(...middlewares));
	let persistor = persistStore(store);
	return { store, persistor };
};

