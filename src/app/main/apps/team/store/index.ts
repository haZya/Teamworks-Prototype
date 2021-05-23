import { combineReducers } from '@reduxjs/toolkit';
import team from './teamSlice';

const teamAppReducers = combineReducers({
	team
});

export default teamAppReducers;
