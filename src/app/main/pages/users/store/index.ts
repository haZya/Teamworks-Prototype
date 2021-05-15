import { combineReducers } from '@reduxjs/toolkit';
import currentUser from './currentUserSlice';
import users from './usersSlice';

const reducer = combineReducers({
	users,
	currentUser
});

export default reducer;
