import { configureStore, Middleware, Reducer } from '@reduxjs/toolkit';
import { LogEntryObject } from 'redux-logger/index';
import createReducer from './rootReducer';

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require(`redux-logger`);
	const logger: Middleware = createLogger({
		collapsed: (_getState: () => any, _action: any, logEntry: LogEntryObject) => !logEntry.error
	});

	middlewares.push(logger);
}

const store = configureStore({
	reducer: createReducer(),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});

export interface IAsyncReducers {
	[key: string]: Reducer;
}

const asyncReducers: IAsyncReducers = {};

export const injectReducer = (key: string, reducer: Reducer) => {
	if (asyncReducers[key]) {
		return false;
	}
	asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(asyncReducers));
	return store;
};

export default store;
export type RootState = ReturnType<typeof store.getState>;
