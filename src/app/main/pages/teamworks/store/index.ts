import { combineReducers } from '@reduxjs/toolkit';
import users from '../../../apps/team/store/itemSlice';
import categories from './categoriesSlice';
import priorities from './prioritiesSlice';
import teamwork from './teamworkSlice';
import teamworks from './teamworksSlice';
import widgets from './widgetSlice';

const reducer = combineReducers({
	users,
	categories,
	priorities,
	teamworks,
	teamwork,
	widgets
});

export default reducer;
