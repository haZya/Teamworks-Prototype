import { combineReducers } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import teamwork from './teamworkSlice';
import teamworks from './teamworksSlice';
import widgets from './widgetSlice';

const reducer = combineReducers({
	categories,
	teamworks,
	teamwork,
	widgets
});

export default reducer;
