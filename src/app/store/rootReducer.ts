import { Action, CombinedState, combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import { IAsyncReducers } from '.';
import fuse from './fuse';

const createReducer = (asyncReducers?: IAsyncReducers) => (state: CombinedState<any>, action: Action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
