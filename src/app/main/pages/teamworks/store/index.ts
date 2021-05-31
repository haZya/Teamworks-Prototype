import { combineReducers } from '@reduxjs/toolkit';
import users from '../../../apps/team/store/itemSlice';
import categories from './categoriesSlice';
import priorities from './prioritiesSlice';
import statuses from './statusesSlice';
import teamwork from './teamworkSlice';
import teamworks from './teamworksSlice';
import widgets from './widgetSlice';

const reducer = combineReducers({
	users,
	categories,
	priorities,
	statuses,
	teamworks,
	teamwork,
	widgets
});

export default reducer;
