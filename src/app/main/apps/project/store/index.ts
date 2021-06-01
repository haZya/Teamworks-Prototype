import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectSlice';

const projectAppReducers = combineReducers({
	projects
});

export default projectAppReducers;
