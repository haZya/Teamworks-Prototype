import { Action, CombinedState, combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import { IAsyncReducers } from '.';
import fuse from './fuse';
import i18n from './i18nSlice';

const createReducer = (asyncReducers?: IAsyncReducers) => (state: CombinedState<any>, action: Action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
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
