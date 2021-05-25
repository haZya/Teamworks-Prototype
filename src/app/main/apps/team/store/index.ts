import { combineReducers } from '@reduxjs/toolkit';
import items from './itemSlice';
import team from './teamSlice';

const teamAppReducers = combineReducers({
	team,
	items
});

export default teamAppReducers;
