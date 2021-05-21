import { combineReducers } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import teamwork from './teamworkSlice';
import teamworks from './teamworksSlice';

const reducer = combineReducers({
	categories,
	teamworks,
	teamwork
});

export default reducer;
